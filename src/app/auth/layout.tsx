"use client"
import AuthContext from '@/contexts/auth';
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    const { signed } = useContext(AuthContext)
    const router = useRouter()

    useEffect(() => {
        if (signed) {
            router.push('/app/profile')
        }
    }, [signed])

    return children
}