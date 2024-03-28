<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasRoles, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */

    public function restaurantsAdmin()
    {
        $role = Role::where("name", "restaurant_admin")->first();
        return $this->belongsToMany(Restaurant::class)->wherePivot('role_id', $role->id)->with('tags', 'geolocation')->withPivot([]);
    }
    public function restaurants()
    {
        return $this->belongsToMany(Restaurant::class);
    }
    protected function getUserHasRestaurantCountAttribute()
    {
        return $this->restaurantsAdmin()->count();
    }
    protected $appends = ['user_has_restaurant_count'];

    protected $fillable = [
        'name',
        'email',
        'password',
        'tel_number',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {

        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}
