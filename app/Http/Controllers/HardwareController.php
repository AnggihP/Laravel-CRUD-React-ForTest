<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Hardware;
use Illuminate\Support\Facades\Validator;

class HardwareController extends Controller
{
    public function index()
    {
        $hardware = Hardware::all();
        return Inertia::render('Hardware/Index', ['hardware' => $hardware]);
    }

    public function create()
    {
        return Inertia::render('Hardware/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'hardware'      => ['required'],
            'location'      => ['required'],
            'timezone'      => ['required'],
            'local_time'    => ['required'],
            'latitude'      => ['required'],
            'longitude'     => ['required'],
        ]);

        $user = auth()->user();

        Hardware::create([
            'hardware'      => $request->input('hardware'),
            'location'      => $request->input('location'),
            'timezone'      => $request->input('timezone'),
            'local_time'    => $request->input('local_time'),
            'latitude'      => $request->input('latitude'),
            'longitude'     => $request->input('longitude'),
            'created_by'    => $user->name,
            'created_at'    => now(),
        ]);

        return redirect()->route('hardware.index');
    }

    public function edit(Hardware $hardware)
    {
        return Inertia::render('Hardware/Edit', [
            'hardware' => $hardware
        ]);
    }

    public function update($id, Request $request)
    {
        $request->validate([
            'hardware'      => ['required'],
            'location'      => ['required'],
            'timezone'      => ['required'],
            'local_time'    => ['required'],
            'latitude'      => ['required'],
            'longitude'     => ['required'],
        ]);

        Hardware::find($id)->update([
            'hardware'      => $request->input('hardware'),
            'location'      => $request->input('location'),
            'timezone'      => $request->input('timezone'),
            'local_time'    => $request->input('local_time'),
            'latitude'      => $request->input('latitude'),
            'longitude'     => $request->input('longitude'),
        ]);

        return redirect()->route('hardware.index');
    }

    public function destroy($id)
    {
        $sensor = Hardware::find($id);

        if (auth()->user()->role === 'admin') {
            $sensor->deleted_at = now();
            $sensor->save();
        } elseif (auth()->user()->role === 'superadmin') {
            $sensor->delete();
        }

        return redirect()->route('hardware.index');
    }
}