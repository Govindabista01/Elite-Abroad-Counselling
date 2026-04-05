import { fetchAPI } from '@/lib/api';
import BlogContent from '@/components/BlogContent';
import Link from 'next/link';

interface BlogPost {
    id: number;
    title: string;
    slug: string;
    content: string;
    published_date: string;
    author_name?: string;
    image?: string;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    try {
        const data = await fetchAPI(`/blog/`);
        const post = data.find((p: any) => p.slug === slug);
        if (post) {
            return {
                title: `${post.title} | Elite Abroad Blog`,
                description: post.content.substring(0, 160),
            };
        }
    } catch (e) {
        return { title: 'Blog Post | Elite Abroad' };
    }
}

export default async function BlogPostDetail({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    let post: BlogPost | null = null;
    try {
        post = await fetchAPI(`/blog/${slug}/`);
    } catch (err) {
        console.error('Failed to load blog post:', err);
    }

    if (!post) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-10">
                <h1 className="text-4xl font-black text-primary uppercase italic">Article Not Found</h1>
                <Link href="/blog" className="px-10 py-5 bg-primary text-white rounded-3xl font-black uppercase tracking-widest">Back to Blog</Link>
            </div>
        );
    }

    return <BlogContent post={post} />;
}
