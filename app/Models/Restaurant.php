<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Restaurant extends Model
{
    protected $fillable = [
        'name',
        'tel_number',
        'address_id',
        'work_time',
        'is_accepting_orders',
        'is_working',
        'is_banned',
        'is_confirmed',
        'tel_number',
        'geolocation_address_id',
    ];
    use HasFactory;
}
