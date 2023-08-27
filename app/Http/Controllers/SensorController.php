<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Master_Sensor;
use Illuminate\Support\Facades\Validator;

class SensorController extends Controller
{
    public function index()
    {
        $sensor = Master_Sensor::all();
        return Inertia::render('Sensor/Index', ['sensor' => $sensor]);
    }

    public function create()
    {
        return Inertia::render('Sensor/Create');
    }

    public function store(Request $request)
    {
        Validator::make($request->all(), [
            'sensor'        => ['required'],
            'sensor_name'   => ['required'],
            'unit'          => ['required']
        ])->validate();


        $user = auth()->user();

        Master_Sensor::create([
            'sensor'        => $request->input('sensor'),
            'sensor_name'   => $request->input('sensor_name'),
            'unit'          => $request->input('unit'),
            'created_by'    => $user->name, 
            'created_at'    => now(),
        ]);

        return redirect()->route('sensor.index');
    }

    public function edit(Master_Sensor $sensor)
    {
        return Inertia::render('Sensor/Edit', [
            'sensor' => $sensor
        ]);
    }

    public function update($id, Request $request)
    {
        Validator::make($request->all(), [
            'sensor'        => ['required'],
            'sensor_name'   => ['required'],
            'unit'          => ['required']
        ])->validate();

        Master_Sensor::find($id)->update([
            'sensor'        => $request->input('sensor'),
            'sensor_name'   => $request->input('sensor_name'),
            'unit'          => $request->input('unit'),
        ]);

        return redirect()->route('sensor.index');
    }

    public function destroy($id)
    {
        $sensor = Master_Sensor::find($id);

        if (auth()->user()->role === 'admin') {
            $sensor->deleted_at = now();
            $sensor->save();
        } elseif (auth()->user()->role === 'superadmin') {
            $sensor->delete();
        }

        return redirect()->route('sensor.index');
    }
}