<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GeolocationAddress extends Model
{
    protected $fillable = [
        "name",
        "restaurant_id",
        "place_id",
        "formatted_address",
        "lat",
        "lng",
    ];
    use HasFactory;
}
