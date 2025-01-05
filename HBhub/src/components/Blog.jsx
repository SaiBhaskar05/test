import React from 'react';
import '../Blog.css'; // External CSS for styling

const Blog = () => {
    const posts = [
        {
            id: 1,
            title: 'Exploring Photography as a Hobby',
            content: 'Photography is a creative and relaxing hobby that lets you capture moments and explore the world through a lens.',
            author: 'Sarah Lee',
            date: 'January 3, 2025',
            thumbnail: 'https://img.freepik.com/free-vector/focus-concept-illustration_114360-1104.jpg?ga=GA1.1.1109099461.1719987932&semt=ais_hybrid', // Example image URL for Photography
            tags: ['Photography', 'Creative', 'Art'],
            mediumLink: 'https://medium.com/tag/photography' // Example link for Photography
        },
        {
            id: 2,
            title: 'Why Gardening is the Perfect Stress-Relief Hobby',
            content: 'Gardening provides a sense of calm and accomplishment as you nurture plants and create beautiful green spaces.',
            author: 'David Brown',
            date: 'January 2, 2025',
            thumbnail: 'https://img.freepik.com/free-vector/horticulture-cartoon-composition-adults-kid-various-farming-activity-white-background_1284-31113.jpg?ga=GA1.1.1109099461.1719987932&semt=ais_hybrid', // Example image URL for Gardening
            tags: ['Gardening', 'Nature', 'Relaxation'],
            mediumLink: 'https://medium.com/tag/gardening' // Example link for Gardening
        },
        {
            id: 3,
            title: 'How to Start Painting: A Beginner’s Guide',
            content: 'Painting is a wonderful way to express your creativity and unwind. In this post, we’ll discuss how to start painting as a hobby.',
            author: 'Emily Johnson',
            date: 'January 1, 2025',
            thumbnail: 'https://img.freepik.com/free-vector/decorative-flat-brushes-paint-smear-strokes-dip-pen-ink-blotches-template-poster-doodle-sketch-vector-illustration_1284-2361.jpg?ga=GA1.1.1109099461.1719987932&semt=ais_hybrid', // Example image URL for Painting
            tags: ['Painting', 'Art', 'Creativity'],
            mediumLink: 'https://medium.com/tag/art' // Example link for Painting
        },
    ];

    return (
        <div className="blog-container">
            <h1 className="blog-title">Hobby Enthusiasts Blog</h1>
            <div className="posts-grid">
                {posts.map(post => (
                    <div className="post-card" key={post.id}>
                        <a href={post.mediumLink} target="_blank" rel="noopener noreferrer" className="post-link">
                            <img src={post.thumbnail} alt={`${post.title} Thumbnail`} className="post-thumbnail" />
                            <div className="post-content">
                                <h2 className="post-title">{post.title}</h2>
                                <p className="post-meta">
                                    By <span className="post-author">{post.author}</span> on {post.date}
                                </p>
                                <p className="post-excerpt">{post.content}</p>
                                <div className="post-tags">
                                    {post.tags.map(tag => (
                                        <span key={tag} className="tag">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Blog;
