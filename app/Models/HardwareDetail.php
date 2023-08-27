<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HardwareDetail extends Model
{
    use HasFactory;
    protected $table = 'hardware_detail';
    protected $fillable = [
        'hardware',
        'sensor',
    ];
    public $timestamps = false;
}