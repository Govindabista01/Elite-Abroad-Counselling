'use client';

import { useState } from 'react';
import { GraduationCap } from 'lucide-react';

interface Props {
    name: string;
    website?: string;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

function getInitials(name: string): string {
    return name
        .split(' ')
        .filter(w => w.length > 2 && !['of', 'the', 'and', 'in', 'at', 'for'].includes(w.toLowerCase()))
        .slice(0, 2)
        .map(w => w[0].toUpperCase())
        .join('');
}

// We strictly load URLs from the locally verified high resolution logos to ensure genuine brand display.
function getLogoUrls(name: string): string[] {
    const slug = name.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

    return [
        `/logos/${slug}.png`,
        `/logos/${slug}.svg`,
        `/logos/${slug}.jpg`
    ];
}

export default function UniversityLogo({ name, size = 'md', className = '' }: Props) {
    const urls = getLogoUrls(name);

    const [urlIndex, setUrlIndex] = useState(0);
    const [allFailed, setAllFailed] = useState(false);

    const sizeMap = {
        sm: { container: 'w-12 h-12', imgCls: 'w-10 h-10' },
        md: { container: 'w-20 h-20', imgCls: 'w-16 h-16' },
        lg: { container: 'w-28 h-28', imgCls: 'w-20 h-20' },
    };
    const s = sizeMap[size];

    const handleError = () => {
        const next = urlIndex + 1;
        if (next < urls.length) {
            setUrlIndex(next);
        } else {
            setAllFailed(true);
        }
    };

    const initials = getInitials(name);
    const currentUrl = !allFailed && urls[urlIndex] ? urls[urlIndex] : null;

    if (currentUrl) {
        return (
            <div className={`${s.container} flex items-center justify-center ${className}`}>
                <img
                    key={currentUrl}
                    src={currentUrl}
                    alt={`${name} logo`}
                    className={`${s.imgCls} object-contain`}
                    onError={handleError}
                    loading="lazy"
                />
            </div>
        );
    }

    // Fallback: initials badge
    return (
        <div className={`${s.container} flex items-center justify-center ${className}`}>
            <div className="w-full h-full rounded-2xl bg-primary/8 flex items-center justify-center">
                {initials ? (
                    <span
                        className="font-black text-primary"
                        style={{ fontSize: size === 'lg' ? '1.5rem' : size === 'md' ? '1.1rem' : '0.75rem' }}
                    >
                        {initials}
                    </span>
                ) : (
                    <GraduationCap className="text-primary" size={size === 'lg' ? 32 : 20} />
                )}
            </div>
        </div>
    );
}
