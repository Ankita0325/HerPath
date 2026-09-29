'use client';
import React, { useState, useMemo } from 'react';
import { getLearnerKnowledgeGraph, GraphNode, GraphRelationship } from '@/services/neo4jService';
import { Sparkles, ZoomIn, ZoomOut, RotateCcw, Filter, Info, ShieldCheck, X, CheckCircle2, ChevronRight, Award, BookOpen, Briefcase, Target, Trophy } from 'lucide-react';

interface KnowledgeGraphViewerProps {
  learnerId?: string;
  grantedCategories?: Record<string, boolean>;
  learnerName?: string;
  herpathId?: string;
}

export function KnowledgeGraphViewer({
  learnerId = 'u1',
  grantedCategories,
  learnerName = 'Riya Sharma',
  herpathId = 'HP-7K29-X4M8',
}: KnowledgeGraphViewerProps) {
  const [zoom, setZoom] = useState(1);
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [activeFilters, setActiveFilters] = useState<Record<string, boolean>>({
    Skill: true,
    Goal: true,
    LearningPath: true,
    Course: true,
    Project: true,
    Certificate: true,
    Achievement: true,
  });

  // Fetch permitted graph data
  const rawGraph = useMemo(() => {
    return getLearnerKnowledgeGraph(learnerId, grantedCategories);
  }, [learnerId, grantedCategories]);

  // Apply UI category filters
  const filteredGraph = useMemo(() => {
    const nodes = rawGraph.nodes.filter(n => n.type === 'Learner' || activeFilters[n.type] !== false);
    const validNodeIds = new Set(nodes.map(n => n.id));
    const relationships = rawGraph.relationships.filter(
      r => validNodeIds.has(r.source) && validNodeIds.has(r.target)
    );
    return { nodes, relationships };
  }, [rawGraph, activeFilters]);

  // Layout Node Coordinates in radial orbits around center Learner node
  const positionedNodes = useMemo(() => {
    const nodes = filteredGraph.nodes;
    const center = { x: 420, y: 300 };
    const nonCenter = nodes.filter(n => n.type !== 'Learner');

    const total = nonCenter.length;
    const radius = 210;

    const mapped = nodes.map(node => {
      if (node.type === 'Learner') {
        return { ...node, x: center.x, y: center.y };
      }
      const idx = nonCenter.findIndex(n => n.id === node.id);
      const angle = (idx / total) * 2 * Math.PI - Math.PI / 2;
      return {
        ...node,
        x: center.x + radius * Math.cos(angle),
        y: center.y + radius * Math.sin(angle),
      };
    });

    return mapped;
  }, [filteredGraph.nodes]);

  const nodeMap = useMemo(() => {
    const map = new Map<string, typeof positionedNodes[0]>();
    positionedNodes.forEach(n => map.set(n.id, n));
    return map;
  }, [positionedNodes]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Skill': return <Sparkles size={14} color="white" />;
      case 'Goal': return <Target size={14} color="white" />;
      case 'LearningPath':
      case 'Course': return <BookOpen size={14} color="white" />;
      case 'Project': return <Briefcase size={14} color="white" />;
      case 'Certificate': return <Award size={14} color="white" />;
      case 'Achievement': return <Trophy size={14} color="white" />;
      default: return <ShieldCheck size={16} color="white" />;
    }
  };

  const typeLegend = [
    { type: 'Learner', label: 'Learner Identity', color: '#0F766E' },
    { type: 'Skill', label: 'Skills', color: '#14B8A6' },
    { type: 'LearningPath', label: 'Learning Paths', color: '#0F3D3E' },
    { type: 'Project', label: 'Projects', color: '#2563EB' },
    { type: 'Certificate', label: 'Certificates', color: '#059669' },
    { type: 'Achievement', label: 'Achievements', color: '#7C3AED' },
    { type: 'Goal', label: 'Goals', color: '#D97706' },
  ];

  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden', border: '1px solid var(--border)' }}>
      {/* Header Controls */}
      <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', background: 'var(--bg-alt)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontWeight: 800, fontSize: '1rem', fontFamily: "'Plus Jakarta Sans'" }}>Neo4j Knowledge Graph</span>
            <span className="badge badge-primary"><ShieldCheck size={12} style={{ marginRight: 3 }} /> Permission-Filtered</span>
          </div>
          <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
            Exploring <strong>{learnerName}</strong> ({herpathId}) learning identity connections
          </div>
        </div>

        {/* Zoom & Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button onClick={() => setZoom(z => Math.min(z + 0.15, 1.5))} className="btn btn-secondary btn-sm" title="Zoom In">
            <ZoomIn size={14} />
          </button>
          <button onClick={() => setZoom(z => Math.max(z - 0.15, 0.6))} className="btn btn-secondary btn-sm" title="Zoom Out">
            <ZoomOut size={14} />
          </button>
          <button onClick={() => setZoom(1)} className="btn btn-secondary btn-sm" title="Reset View">
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* Main Canvas & Side Panel Container */}
      <div style={{ display: 'grid', gridTemplateColumns: selectedNode ? '1fr 300px' : '1fr', minHeight: 520, position: 'relative', background: '#F8FAFC' }}>
        {/* SVG Graph Canvas */}
        <div style={{ width: '100%', height: 520, position: 'relative', overflow: 'hidden', cursor: 'grab' }}>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 840 600"
            style={{ transform: `scale(${zoom})`, transformOrigin: 'center center', transition: 'transform 0.2s ease-out' }}
          >
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="28" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--border-mid)" />
              </marker>
            </defs>

            {/* Background Grid Lines */}
            <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(226,232,240,0.6)" strokeWidth="1" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Relationships / Edges */}
            {filteredGraph.relationships.map(rel => {
              const source = nodeMap.get(rel.source);
              const target = nodeMap.get(rel.target);
              if (!source || !target) return null;

              const isHighlighted = selectedNode && (selectedNode.id === source.id || selectedNode.id === target.id);
              const midX = (source.x + target.x) / 2;
              const midY = (source.y + target.y) / 2;

              return (
                <g key={rel.id}>
                  <line
                    x1={source.x}
                    y1={source.y}
                    x2={target.x}
                    y2={target.y}
                    stroke={isHighlighted ? 'var(--primary)' : 'var(--border-mid)'}
                    strokeWidth={isHighlighted ? 3 : 1.8}
                    strokeDasharray={rel.type === 'WANTS_TO_LEARN' || rel.type === 'HAS_GOAL' ? '5,5' : 'none'}
                    markerEnd="url(#arrow)"
                    style={{ transition: 'all 0.2s ease' }}
                  />
                  <rect
                    x={midX - 35}
                    y={midY - 9}
                    width={70}
                    height={18}
                    rx={9}
                    fill="white"
                    stroke={isHighlighted ? 'var(--primary)' : 'var(--border)'}
                    strokeWidth={1}
                  />
                  <text
                    x={midX}
                    y={midY + 3}
                    textAnchor="middle"
                    fontSize="9"
                    fontWeight="700"
                    fill={isHighlighted ? 'var(--primary)' : 'var(--text-muted)'}
                    fontFamily="Inter, sans-serif"
                  >
                    {rel.type}
                  </text>
                </g>
              );
            })}

            {/* Nodes */}
            {positionedNodes.map(node => {
              const isSelected = selectedNode?.id === node.id;
              const isCenter = node.type === 'Learner';
              const size = isCenter ? 36 : 24;

              return (
                <g
                  key={node.id}
                  transform={`translate(${node.x}, ${node.y})`}
                  onClick={() => setSelectedNode(node)}
                  style={{ cursor: 'pointer' }}
                >
                  {/* Selection Ring */}
                  {isSelected && (
                    <circle r={size + 8} fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeDasharray="4,4" />
                  )}

                  {/* Node Circle */}
                  <circle
                    r={size}
                    fill={node.color}
                    stroke="white"
                    strokeWidth="3"
                    style={{
                      boxShadow: 'var(--shadow-md)',
                      transition: 'transform 0.2s ease',
                      filter: isSelected ? 'drop-shadow(0 4px 8px rgba(15,118,110,0.4))' : 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
                    }}
                  />

                  {/* Icon */}
                  <foreignObject x={-size} y={-size} width={size * 2} height={size * 2} style={{ pointerEvents: 'none' }}>
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {getTypeIcon(node.type)}
                    </div>
                  </foreignObject>

                  {/* Node Label Text */}
                  <text
                    y={size + 16}
                    textAnchor="middle"
                    fontSize={isCenter ? '12' : '11'}
                    fontWeight={isCenter ? '800' : '600'}
                    fill="var(--text)"
                    fontFamily="Plus Jakarta Sans, sans-serif"
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Selected Node Inspection Side Panel */}
        {selectedNode && (
          <div style={{ padding: '20px', borderLeft: '1px solid var(--border)', background: 'white', display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="chip" style={{ background: selectedNode.color + '15', color: selectedNode.color, border: `1px solid ${selectedNode.color}40`, fontWeight: 700, fontSize: '0.75rem' }}>
                {selectedNode.type} Node
              </span>
              <button onClick={() => setSelectedNode(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                <X size={16} />
              </button>
            </div>

            <div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 800, fontFamily: "'Plus Jakarta Sans'", marginBottom: 4 }}>{selectedNode.label}</h3>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Category: {selectedNode.category}</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '12px', background: 'var(--bg-alt)', borderRadius: 'var(--radius)', fontSize: '0.8125rem' }}>
              {Object.entries(selectedNode.properties).map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)', textTransform: 'capitalize' }}>{k}:</span>
                  <span style={{ fontWeight: 600, color: 'var(--text)' }}>{String(v)}</span>
                </div>
              ))}
            </div>

            <div style={{ fontSize: '0.75rem', color: 'var(--primary)', background: 'var(--accent-light)', padding: '10px', borderRadius: 'var(--radius)', display: 'flex', alignItems: 'center', gap: 6 }}>
              <ShieldCheck size={14} /> Permitted graph relation
            </div>
          </div>
        )}
      </div>

      {/* Legend & Filter Footer */}
      <div style={{ padding: '14px 20px', borderTop: '1px solid var(--border)', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Node Legend:</span>
          {typeLegend.map(item => (
            <button
              key={item.type}
              onClick={() => item.type !== 'Learner' && setActiveFilters(f => ({ ...f, [item.type]: !f[item.type] }))}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                fontSize: '0.75rem',
                border: 'none',
                background: 'transparent',
                cursor: item.type === 'Learner' ? 'default' : 'pointer',
                opacity: activeFilters[item.type] !== false ? 1 : 0.4,
              }}
            >
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: item.color }} />
              <span style={{ fontWeight: activeFilters[item.type] !== false ? 600 : 400 }}>{item.label}</span>
            </button>
          ))}
        </div>

        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
          <Info size={12} /> Powered by HerPath Knowledge Graph Engine
        </div>
      </div>
    </div>
  );
}
