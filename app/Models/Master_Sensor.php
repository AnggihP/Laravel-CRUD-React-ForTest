<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Master_Sensor extends Model
{
    use HasFactory;
    protected $table = 'master_sensor';
    protected $fillable = [
        'sensor', 'sensor_name', 'unit', 'created_by', 'created_at',
    ];
    public $timestamps = false;

}