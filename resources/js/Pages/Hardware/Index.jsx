import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import Swal from 'sweetalert2';

export default function Hardware({ auth, hardware }) {

    const userRole = auth.user.role;

    function destroy(e, id) {
        e.preventDefault(); 

        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this hardware!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.isConfirmed) {
                Inertia.delete(route("hardware.destroy", id));
                Swal.fire({
                    icon: 'success',
                    title: 'Data deleted!',
                    showConfirmButton: false,
                    timer: 1500
                })
                window.location.reload();
            }
        });
    }
    return (
        <AuthenticatedLayout
            user={auth.user} errors={hardware.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Hardware</h2>}
        >
            <Head title="Hardware" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            {userRole === 'superadmin' || userRole === 'admin' ? (
                                <div className="flex items-center justify-end mb-6">
                                    <Link className="px-6 py-2 text-white bg-green-500 rounded-md focus:outline-none" href={route("hardware.create")}>Add Data</Link>
                                </div>
                            ) : null}
                            <table className="table-fixed w-full">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="px-4 py-2">Hardware</th>
                                        <th className="px-4 py-2">Location</th>
                                        <th className="px-4 py-2">Timezone</th>
                                        <th className="px-4 py-2">Local Time</th>
                                        <th className="px-4 py-2">Latitude</th>
                                        <th className="px-4 py-2">Longitude</th>
                                        <th className="px-4 py-2">Created By</th>
                                        <th className="px-4 py-2">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {hardware.map(({ id, hardware, location, timezone, local_time, latitude, longitude, created_by, deleted_at }) => (
                                        (userRole === 'superadmin' || (userRole === 'admin' && deleted_at === null) || (userRole === 'user' && deleted_at === null)) ? (
                                            <tr key={id}>
                                                <td className="border px-4 py-2">{hardware}</td>
                                                <td className="border px-4 py-2">{location}</td>
                                                <td className="border px-4 py-2">{timezone}</td>
                                                <td className="border px-4 py-2">
                                                    {new Date(local_time).toLocaleString('en-US', {
                                                        year: 'numeric',
                                                        month: 'numeric',
                                                        day: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                        hour12: false
                                                    })}
                                                </td>
                                                <td className="border px-4 py-2">{latitude}</td>
                                                <td className="border px-4 py-2">{longitude}</td>
                                                <td className="border px-4 py-2">{created_by}</td>
                                                <td className="flex border px-4 py-4 justify-center">
                                                    <Link tabIndex="1" type="button" className="px-4 py-2 text-sm text-white bg-yellow-500 rounded" href={route("hardware.edit", id)}>Edit</Link>
                                                    {userRole === 'superadmin' || userRole === 'admin' ? (
                                                        <button onClick={(e) => destroy(e, id, userRole)} tabIndex="-1" type="button" className="mx-1 px-4 py-2 text-sm text-white bg-red-500 rounded">Delete</button>
                                                    ) : null}
                                                </td>

                                            </tr>
                                        ) : null
                                    ))}
                                    {hardware.length === 0 && (
                                        <tr>
                                            <td className="px-6 py-4 border-t" colSpan="4">Data not found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout >
    )
}
