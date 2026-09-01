import { User } from 'lucide-react'
import { useCurrentUser } from '../hooks/useCurrentUser'



export default function userPage() {

    const {
        data: user,
    } = useCurrentUser()
    
    const isAuthenticated = Boolean(user)
    

    return (
        <>
            {!isAuthenticated ? (
                <div>
                    Not authenticated
                </div>
                ) : (
                    <div>
                        <main className="min-h-screen bg-gray- px-6 py-12">
                        <div className="mx-auto max-w-3xl">
                            <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
                            {/* Header */}
                            <div className="h-32 bg-zinc-900" />

                            <div className="px-6 pb-8">
                                {/* Avatar */}
                                <div className="-mt-12 mb-6 flex items-end justify-between">
                                <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-zinc-200 text-zinc-500 shadow-sm">
                                    <User size={40} strokeWidth={1.5} />
                                </div>

                                <button
                                    type="button"
                                    className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
                                >
                                    Edit profile
                                </button>
                                </div>

                                {/* User info */}
                                <div>
                                <h1 className="text-2xl font-semibold text-zinc-900">
                                    {user.name}
                                </h1>

                                <p className="mt-1 text-sm text-zinc-500">
                                    {user.email}
                                </p>
                                </div>

                                {/* Details */}
                                <div className="mt-8 grid gap-4 border-t border-zinc-100 pt-6 sm:grid-cols-2">
                                <div>
                                    <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
                                    Member since
                                    </p>

                                    <p className="mt-1 text-sm text-zinc-700">
                                    {user.createdAt}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
                                    Account
                                    </p>

                                    <p className="mt-1 text-sm text-zinc-700">
                                    Active
                                    </p>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        </main>
                    </div>
                )
                
            }
        </>
  )
}