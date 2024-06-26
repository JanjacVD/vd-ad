<?php

namespace App\Http\Controllers;

use App\Models\Restaurant;
use App\Http\Requests\StoreRestaurantRequest;
use App\Http\Requests\UpdateRestaurantRequest;
use App\Http\Resources\RestaurantResource;
use App\Http\Resources\RestaurantTagResource;
use App\Models\GeolocationAddress;
use App\Models\RestaurantTag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class RestaurantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $restaurants = Auth::user()->restaurantsAdmin;
        $collection = RestaurantResource::collection($restaurants);
        return Inertia::render('Restaurant/Index', ['restaurants' => $collection]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $tags = RestaurantTagResource::collection(RestaurantTag::all());
        return Inertia::render('Restaurant/Create', ['tags' => $tags]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRestaurantRequest $request)
    {
        $newGeolocation = GeolocationAddress::create([
            'name' => $request->name,
            'place_id' => $request->location['place_id'],
            'formatted_address' => $request->location['formatted_address'],
            'lat' => $request->location['lat'],
            'lng' => $request->location['lng'],
        ]);

        $newRestaurant = Restaurant::create([
            'name' => $request->name,
            'tel_number' => $request->tel_number,
            'worktime' => json_encode($request->worktime),
            'geolocation_address_id' => $newGeolocation->id
        ]);
        $tags = $request->tags;
        $newRestaurant->tags()->sync($tags);
        $role = Role::firstOrCreate(['name' => 'restaurant_admin']);
        $newRestaurant->users()->attach($request->user(), ['role_id' => $role->id]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Restaurant $restaurant)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Restaurant $restaurant)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRestaurantRequest $request, Restaurant $restaurant)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Restaurant $restaurant)
    {
        //
    }
}
