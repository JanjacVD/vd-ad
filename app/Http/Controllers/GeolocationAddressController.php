<?php

namespace App\Http\Controllers;

use App\Models\GeolocationAddress;
use App\Http\Requests\StoreGeolocationAddressRequest;
use App\Http\Requests\UpdateGeolocationAddressRequest;

class GeolocationAddressController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreGeolocationAddressRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(GeolocationAddress $geolocationAddress)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(GeolocationAddress $geolocationAddress)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateGeolocationAddressRequest $request, GeolocationAddress $geolocationAddress)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(GeolocationAddress $geolocationAddress)
    {
        //
    }
}
