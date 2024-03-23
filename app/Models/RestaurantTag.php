<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;

class RestaurantTag extends Model
{
    use HasTranslations, HasFactory;
    protected $fillable = ['name', 'icon'];
    public $translatable = ['name'];
}
