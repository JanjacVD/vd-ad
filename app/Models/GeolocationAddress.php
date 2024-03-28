<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GeolocationAddress extends Model
{
    protected $fillable = [
        "name",
        "place_id",
        "formatted_address",
        "lat",
        "lng",
        'user_id'
    ];
    public function restaurant(){
        return $this->hasMany(Restaurant::class);
    }
    use HasFactory;
}
