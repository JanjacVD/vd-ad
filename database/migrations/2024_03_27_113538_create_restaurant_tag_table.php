<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('restaurant_restaurant_tag', function (Blueprint $table) {
            $table->unsignedBigInteger("restaurant_id")->nullable();
            $table->foreign('restaurant_id')->references('id')->on('restaurants');

            $table->unsignedBigInteger("restaurant_tag_id")->nullable();
            $table->foreign('restaurant_tag_id')->references('id')->on('restaurant_tags');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('restaurant_tag');
    }
};
