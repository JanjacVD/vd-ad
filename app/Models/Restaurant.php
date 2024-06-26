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
        'worktime',
        'geolocation_address_id',
    ];
    public function geolocation()
    {
        return $this->belongsTo(GeolocationAddress::class, 'geolocation_address_id');
    }
    public function tags()
    {
        return $this->belongsToMany(RestaurantTag::class);
    }
    
    public function users(){
        return $this->belongsToMany(User::class);
    }
    use HasFactory;
}
