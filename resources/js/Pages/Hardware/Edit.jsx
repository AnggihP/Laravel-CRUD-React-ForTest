import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function Edit({ auth, hardware }) {

    const [localTime, setLocalTime] = useState(new Date());

    const formattedLocalTime = localTime.toISOString().slice(0, 19).replace('T', ' ');

    const { data, setData, errors, put } = useForm({
        hardware: hardware.hardware || "",
        location: hardware.location || "",
        timezone: hardware.timezone || "",
        local_time: formattedLocalTime,
        latitude: hardware.latitude || "",
        longitude: hardware.longitude || "",
    });

    const timezones = [
        { value: "7", label: "Asia/Jakarta" },
    ];

    function handleSubmit(e) {
        e.preventDefault();
        put(route("hardware.update", hardware.id));
    }
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Update Hardware</h2>}
        >
            <Head title="Hardware" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">

                            <div className="flex items-center justify-end mb-6">
                                <Link
                                    className="px-6 py-2 text-white bg-blue-500 rounded-md focus:outline-none"
                                    href={route("hardware.index")}
                                >
                                    Back
                                </Link>
                            </div>

                            <form name="createForm" onSubmit={handleSubmit}>
                                <div className="flex flex-col">
                                    <div className="mb-4">
                                        <label className="">Hardware</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2"
                                            label="hardware"
                                            name="hardware"
                                            value={data.hardware}
                                            onChange={(e) =>
                                                setData("hardware", e.target.value)
                                            }
                                        />
                                        <span className="text-red-600">
                                            {errors.hardware}
                                        </span>
                                    </div>
                                    <div className="mb-4">
                                        <label className="">Location</label>
                                        <input
                                            type="text"
                                            className="w-full rounded"
                                            label="location"
                                            name="location"
                                            errors={errors.location}
                                            value={data.location}
                                            onChange={(e) =>
                                                setData("location", e.target.value)
                                            }
                                        />
                                        <span className="text-red-600">
                                            {errors.location}
                                        </span>
                                    </div>
                                    <div className="mb-4">
                                        <label className="">Timezone</label>
                                        <select
                                            className="w-full rounded"
                                            label="timezone"
                                            name="timezone"
                                            value={data.timezone}
                                            onChange={(e) => setData("timezone", e.target.value)}
                                        >
                                            <option value="" disabled>Select a timezone</option>
                                            {timezones.map((tz) => (
                                                <option key={tz.value} value={tz.value}>
                                                    {tz.label}
                                                </option>
                                            ))}
                                        </select>
                                        <span className="text-red-600">
                                            {errors.timezone}
                                        </span>
                                    </div>
                                    <div className="mb-4">
                                        <label className="">Local Time</label>
                                        <div className="relative">
                                            <DatePicker
                                                selected={localTime}
                                                onChange={date => {
                                                    setLocalTime(date);
                                                    setData("local_time", date.toISOString().slice(0, 19).replace('T', ' '));
                                                }}
                                                className="w-full rounded"
                                            />
                                            <span className="text-red-600 absolute bottom-0 left-0">
                                                {errors.local_time}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label className="">Latitude</label>
                                        <input
                                            type="number"
                                            className="w-full rounded"
                                            label="latitude"
                                            name="latitude"
                                            errors={errors.latitude}
                                            value={data.latitude}
                                            onChange={(e) =>
                                                setData("latitude", e.target.value)
                                            }
                                        />
                                        <span className="text-red-600">
                                            {errors.latitude}
                                        </span>
                                    </div>
                                    <div className="mb-4">
                                        <label className="">Longitude</label>
                                        <input
                                            type="number"
                                            className="w-full rounded"
                                            label="longitude"
                                            name="longitude"
                                            errors={errors.longitude}
                                            value={data.longitude}
                                            onChange={(e) =>
                                                setData("longitude", e.target.value)
                                            }
                                        />
                                        <span className="text-red-600">
                                            {errors.longitude}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex mt-4 justify-end">
                                    <button
                                        type="submit"
                                        className="px-6 py-2 font-bold text-white bg-green-500 rounded"
                                    >
                                        Save
                                    </button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout >
    )
}
