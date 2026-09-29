'use client';
import React, { useState } from 'react';
import { AppLayout } from '@/components/AppLayout';
import { Heart, MessageCircle, Share2, Send, Plus, Award, Briefcase, Star, UserCircle2, Image as ImageIcon, X, Trash2 } from 'lucide-react';
import { useApp } from '@/lib/AppContext';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, setDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore';

type Comment = {
  id: string;
  author: string;
  text: string;
  timestamp: string;
};

type Post = {
  id: string;
  author: string;
  role: 'learner' | 'expert';
  avatarColor: string;
  content: string;
  tags?: string[];
  likes: number;
  comments: Comment[];
  timestamp: string;
  isLikedByMe: boolean;
  image?: string;
};

const initialPosts: Post[] = [
  {
    id: '1',
    author: 'Sarah Jenkins',
    role: 'learner',
    avatarColor: '#8B5CF6',
    content: 'Just finished my first module on Digital Marketing! Super excited to apply these skills. If anyone is looking for a junior marketer or has a startup that needs help, let me know! 🚀',
    tags: ['Achievement', 'Looking For Job'],
    likes: 24,
    comments: [
      { id: 'c1', author: 'Dr. Emily Chen', text: 'Great job Sarah! Keep it up.', timestamp: '2h ago' }
    ],
    timestamp: '3h ago',
    isLikedByMe: false,
  },
  {
    id: '2',
    author: 'Dr. Emily Chen',
    role: 'expert',
    avatarColor: '#10B981',
    content: 'Hi everyone! I am opening up 3 new mentorship slots for next month. I specialize in Tech Startups, UI/UX, and Career Transitions. Pricing is tiered to be affordable for learners. DM me if interested!',
    tags: ['Mentorship', 'UI/UX', 'Career'],
    likes: 45,
    comments: [],
    timestamp: '5h ago',
    isLikedByMe: true,
  },
  {
    id: '3',
    author: 'Priya Sharma',
    role: 'learner',
    avatarColor: '#F59E0B',
    content: 'Started a new eco-friendly packaging startup today! 🌱 It has been a long journey but I am so glad I took the leap. Looking to connect with other founders.',
    tags: ['Startup', 'Founder', 'Eco-friendly'],
    likes: 89,
    comments: [
      { id: 'c2', author: 'Sarah Jenkins', text: 'Wow, so inspiring!', timestamp: '1h ago' }
    ],
    timestamp: '1d ago',
    isLikedByMe: false,
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80'
  }
];

export default function CommunityPage() {
  const { user, currentRole } = useApp();
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostImage, setNewPostImage] = useState<string | null>(null);
  const [commentInput, setCommentInput] = useState<{ [key: string]: string }>({});

  React.useEffect(() => {
    try {
      const unsub = onSnapshot(collection(db, 'community_posts'), (snapshot) => {
        if (!snapshot.empty) {
          const fsPosts: Post[] = snapshot.docs.map(d => ({
            ...(d.data() as Post),
            id: d.id,
          }));
          const fsIds = new Set(fsPosts.map(p => p.id));
          const seedFiltered = initialPosts.filter(p => !fsIds.has(p.id));
          setPosts([...fsPosts, ...seedFiltered]);
        }
      }, err => console.warn('Firestore posts listener error:', err));
      return () => unsub();
    } catch (e) {
      console.warn('Firestore snapshot setup error:', e);
    }
  }, []);

  const handlePost = async () => {
    if (!newPostContent.trim()) return;
    const postId = Date.now().toString();
    const newPost: Post = {
      id: postId,
      author: user?.name || 'Anonymous User',
      role: currentRole as 'learner' | 'expert',
      avatarColor: user?.avatarColor || '#3B82F6',
      content: newPostContent,
      likes: 0,
      comments: [],
      timestamp: 'Just now',
      isLikedByMe: false,
      image: newPostImage || undefined,
    };
    setPosts([newPost, ...posts]);
    setNewPostContent('');
    setNewPostImage(null);

    try {
      await setDoc(doc(db, 'community_posts', postId), newPost);
    } catch (e) {
      console.warn('Firestore post save error:', e);
    }
  };

  const toggleLike = (postId: string) => {
    setPosts(posts.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          isLikedByMe: !p.isLikedByMe,
          likes: p.isLikedByMe ? p.likes - 1 : p.likes + 1,
        };
      }
      return p;
    }));
  };

  const handleDelete = (postId: string) => {
    if (confirm("Are you sure you want to delete this post?")) {
      setPosts(posts.filter(p => p.id !== postId));
    }
  };

  const handleComment = (postId: string) => {
    const text = commentInput[postId];
    if (!text?.trim()) return;
    
    setPosts(posts.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          comments: [...p.comments, {
            id: Date.now().toString(),
            author: user?.name || 'Anonymous User',
            text: text.trim(),
            timestamp: 'Just now',
          }]
        };
      }
      return p;
    }));
    setCommentInput({ ...commentInput, [postId]: '' });
  };

  const handleDeleteComment = (postId: string, commentId: string) => {
    if (confirm("Are you sure you want to delete this comment?")) {
      setPosts(posts.map(p => {
        if (p.id === postId) {
          return { ...p, comments: p.comments.filter(c => c.id !== commentId) };
        }
        return p;
      }));
    }
  };

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setNewPostImage(url);
    }
  };

  const handleShare = async (post: Post) => {
    const shareText = `Check out this post by ${post.author}:\n\n${post.content}\n\n${window.location.href}`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: `Post by ${post.author} on HerPath`,
          text: post.content,
          url: window.location.href,
        });
      } else {
        throw new Error('Web Share not supported');
      }
    } catch (error) {
      // Fallback
      try {
        await navigator.clipboard.writeText(shareText);
        alert('Post link copied to clipboard!');
      } catch (err) {
        alert('Could not copy link. Please manually copy the URL.');
      }
    }
  };

  return (
    <AppLayout>
      <div className="topbar">
        <div>
          <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text)' }}>Community</div>
          <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Connect, share achievements, and find opportunities.</div>
        </div>
      </div>

      <div className="page-container" style={{ maxWidth: '700px', margin: '0 auto' }}>
        
        {/* Create Post Section */}
        <div className="card" style={{ padding: '20px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', gap: '12px' }}>
            <div className="avatar-placeholder" style={{ background: user?.avatarColor || '#ccc', width: '40px', height: '40px', fontSize: '1.2rem', color: 'white' }}>
              {user?.initials || 'U'}
            </div>
            <div style={{ flex: 1 }}>
              <textarea
                value={newPostContent}
                onChange={e => setNewPostContent(e.target.value)}
                placeholder={currentRole === 'expert' ? "Share your mentorship availability, pricing, or skills..." : "Share an achievement, job request, or startup idea..."}
                style={{
                  width: '100%',
                  minHeight: '80px',
                  padding: '12px',
                  borderRadius: 'var(--radius)',
                  border: '1px solid var(--border)',
                  resize: 'none',
                  fontSize: '0.9375rem',
                  fontFamily: 'inherit',
                  outline: 'none',
                  background: 'var(--bg-alt)'
                }}
              />
              
              {newPostImage && (
                <div style={{ position: 'relative', marginTop: '12px', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
                  <img src={newPostImage} alt="Upload preview" style={{ width: '100%', maxHeight: '300px', objectFit: 'cover', display: 'block' }} />
                  <button
                    onClick={() => setNewPostImage(null)}
                    style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(0,0,0,0.6)', color: 'white', border: 'none', borderRadius: '50%', padding: '4px', cursor: 'pointer' }}
                  >
                    <X size={16} />
                  </button>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--primary)', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 600, padding: '8px 12px', borderRadius: 'var(--radius)', background: 'var(--accent-light)', border: 'none' }}
                >
                  <ImageIcon size={18} />
                  Add Image
                </button>
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                
                <button
                  onClick={handlePost}
                  disabled={!newPostContent.trim() && !newPostImage}
                  className="btn btn-primary"
                  style={{ gap: '6px' }}
                >
                  <Send size={16} /> Post
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Feed */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {posts.map(post => (
            <div key={post.id} className="card" style={{ padding: '20px' }}>
              
              {/* Post Header */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div className="avatar-placeholder" style={{ background: post.avatarColor, width: '48px', height: '48px', fontSize: '1.2rem', color: 'white' }}>
                    {post.author.charAt(0)}
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontWeight: 700, color: 'var(--text)', fontSize: '1rem' }}>{post.author}</span>
                      <span className={`badge ${post.role === 'expert' ? 'badge-primary' : 'badge-success'}`} style={{ fontSize: '0.7rem' }}>
                        {post.role === 'expert' ? 'Expert' : 'Learner'}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{post.timestamp}</div>
                  </div>
                </div>
                {(post.author === user?.name || post.author === 'Anonymous User') && (
                  <button
                    onClick={() => handleDelete(post.id)}
                    style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}
                    title="Delete post"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>

              {/* Post Content */}
              <p style={{ color: 'var(--text)', fontSize: '0.9375rem', lineHeight: 1.6, marginBottom: '16px', whiteSpace: 'pre-wrap' }}>
                {post.content}
              </p>

              {/* Post Image */}
              {post.image && (
                <div style={{ marginBottom: '16px', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
                  <img src={post.image} alt="Post attachment" style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', display: 'block' }} />
                </div>
              )}

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
                  {post.tags.map(tag => (
                    <span key={tag} style={{ fontSize: '0.75rem', padding: '4px 10px', background: 'var(--bg-alt)', color: 'var(--text-secondary)', borderRadius: '100px', fontWeight: 600 }}>
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '12px 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', marginBottom: '16px' }}>
                <button
                  onClick={() => toggleLike(post.id)}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', cursor: 'pointer', color: post.isLikedByMe ? '#ef4444' : 'var(--text-muted)', fontWeight: 600, fontSize: '0.875rem' }}
                >
                  <Heart size={18} fill={post.isLikedByMe ? '#ef4444' : 'none'} />
                  {post.likes}
                </button>
                <button style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.875rem' }}>
                  <MessageCircle size={18} />
                  {post.comments.length}
                </button>
                <button 
                  onClick={() => handleShare(post)}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.875rem' }}
                >
                  <Share2 size={18} />
                  Share
                </button>
              </div>

              {/* Comments Section */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {post.comments.map(comment => (
                  <div key={comment.id} style={{ display: 'flex', gap: '10px', background: 'var(--bg-alt)', padding: '12px', borderRadius: 'var(--radius)' }}>
                    <div className="avatar-placeholder" style={{ background: '#64748B', width: '32px', height: '32px', fontSize: '0.9rem', color: 'white', flexShrink: 0 }}>
                      {comment.author.charAt(0)}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <span style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text)' }}>{comment.author}</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{comment.timestamp}</span>
                      </div>
                      <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0 }}>{comment.text}</p>
                    </div>
                    {(comment.author === user?.name || comment.author === 'Anonymous User') && (
                      <button
                        onClick={() => handleDeleteComment(post.id, comment.id)}
                        style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', borderRadius: '50%', flexShrink: 0 }}
                        title="Delete comment"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                ))}
                
                {/* Add Comment Input */}
                <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                  <div className="avatar-placeholder" style={{ background: user?.avatarColor || '#ccc', width: '32px', height: '32px', fontSize: '0.9rem', color: 'white', flexShrink: 0 }}>
                    {user?.initials || 'U'}
                  </div>
                  <input
                    value={commentInput[post.id] || ''}
                    onChange={e => setCommentInput({ ...commentInput, [post.id]: e.target.value })}
                    onKeyDown={e => e.key === 'Enter' && handleComment(post.id)}
                    placeholder="Write a comment..."
                    style={{
                      flex: 1,
                      padding: '8px 12px',
                      borderRadius: '100px',
                      border: '1px solid var(--border)',
                      outline: 'none',
                      fontSize: '0.875rem',
                      background: 'var(--card)',
                    }}
                  />
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
