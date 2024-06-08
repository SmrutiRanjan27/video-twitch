"use client"

import { cn } from '@/lib/utils';
import { useMediaQuery } from 'usehooks-ts';
import { useEffect } from 'react';
import { useCreatorSidebar } from '@/store/use-creator-sidebar';

export const Container = ({children}: {children: React.ReactNode}) => {
    const {collapsed, onCollapse, onExpand } = useCreatorSidebar((state) => state);
    const matches = useMediaQuery("(max-width: 1024px)");

    useEffect(() => {
        if (matches) {
            onCollapse();
        } else {
            onExpand();
        }
    }, [matches, onCollapse, onExpand])

    return (
        <div className={cn(
            "flex-1",
            collapsed ? "ml-[70px]" : "ml-[70px] lg:ml-60",
        )}>
            {children}
        </div>
    )
}