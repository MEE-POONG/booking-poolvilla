import AdminLayout from "@/components/admin/AdminLayout";
import {
    Users,
    Search,
    MoreVertical,
    Shield,
    User as UserIcon,
    Mail,
    Phone,
    Calendar,
    Lock,
    Edit2
} from "lucide-react";

export default function UserManagement() {
    const mockUsers = [
        {
            id: "U001",
            name: "Admin User",
            email: "admin@poolvilla.com",
            phone: "081-234-5678",
            role: "Admin",
            joined: "2025-10-01",
            bookings: 0,
            avatar: "AU"
        },
        {
            id: "U002",
            name: "John Doe",
            email: "john@example.com",
            phone: "082-345-6789",
            role: "Customer",
            joined: "2025-11-15",
            bookings: 3,
            avatar: "JD"
        },
        {
            id: "U003",
            name: "Alice Smith",
            email: "alice@example.com",
            phone: "083-456-7890",
            role: "Customer",
            joined: "2025-12-01",
            bookings: 1,
            avatar: "AS"
        },
        {
            id: "U004",
            name: "Bob Wilson",
            email: "bob@example.com",
            phone: "084-567-8901",
            role: "Customer",
            joined: "2025-12-20",
            bookings: 2,
            avatar: "BW"
        }
    ];

    return (
        <AdminLayout>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-gray-900">Users Management</h1>
                    <p className="text-gray-600">Overview of all registered customers and staff.</p>
                </div>
                <div className="flex gap-4">
                    <button className="bg-white text-gray-700 px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-gray-50 transition-all shadow-sm border border-gray-200">
                        <Shield size={20} />
                        Manage Roles
                    </button>
                </div>
            </div>

            {/* Filters & Search */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search by name, email or phone..."
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                    />
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <select className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none text-sm text-gray-600">
                        <option>All Roles</option>
                        <option>Admin</option>
                        <option>Customer</option>
                    </select>
                    <select className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none text-sm text-gray-600">
                        <option>Sort by: Newest</option>
                        <option>Sort by: Oldest</option>
                        <option>Sort by: Bookings</option>
                    </select>
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">User</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Contact Info</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Role</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Joined</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Bookings</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {mockUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${user.role === 'Admin' ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-600'
                                                }`}>
                                                {user.avatar}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900 leading-tight">{user.name}</h4>
                                                <p className="text-[10px] text-gray-500 font-mono mt-0.5">{user.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="space-y-1">
                                            <p className="text-sm text-gray-600 flex items-center gap-1.5"><Mail size={14} className="text-gray-400" /> {user.email}</p>
                                            <p className="text-sm text-gray-600 flex items-center gap-1.5"><Phone size={14} className="text-gray-400" /> {user.phone}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${user.role === 'Admin'
                                                ? 'bg-purple-50 text-purple-700 border border-purple-100'
                                                : 'bg-blue-50 text-blue-700 border border-blue-100'
                                            }`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        <div className="flex items-center gap-1.5">
                                            <Calendar size={14} className="text-gray-400" />
                                            {user.joined}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="bg-gray-100 rounded-full h-1.5 w-16 overflow-hidden mb-1">
                                            <div className="bg-emerald-500 h-full" style={{ width: `${Math.min(user.bookings * 20, 100)}%` }}></div>
                                        </div>
                                        <span className="text-[10px] font-bold text-gray-500 uppercase">{user.bookings} active</span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-1">
                                            <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" title="Edit">
                                                <Edit2 size={18} />
                                            </button>
                                            <button className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all" title="Reset Password">
                                                <Lock size={18} />
                                            </button>
                                            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-all">
                                                <MoreVertical size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
                    <p className="text-sm text-gray-500">Showing 4 of 128 users</p>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">Previous</button>
                        <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">Next</button>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
