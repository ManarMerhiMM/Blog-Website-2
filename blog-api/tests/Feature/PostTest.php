<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Post;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

class PostTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function anyone_can_view_all_posts()
    {
        Post::factory()->count(3)->create();

        $response = $this->getJson('/api/posts');

        $response->assertOk()
            ->assertJsonCount(3);
    }

    /** @test */
    public function anyone_can_view_a_single_post()
    {
        $post = Post::factory()->create();

        $response = $this->getJson("/api/posts/{$post->id}");

        $response->assertOk()
            ->assertJsonFragment(['id' => $post->id]);
    }

    /** @test */
    public function an_authenticated_user_can_create_a_post()
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $data = [
            'title' => 'Test Post',
            'content' => 'Test Body',
        ];

        $response = $this->postJson('/api/posts', $data);

        $response->assertCreated()
            ->assertJsonFragment(['title' => 'Test Post']);

        $this->assertDatabaseHas('posts', ['title' => 'Test Post']);
    }

    /** @test */
    public function a_user_can_update_their_own_post()
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $post = Post::factory()->for($user)->create([
            'title' => 'Old Title',
        ]);

        $response = $this->putJson("/api/posts/{$post->id}", [
            'title' => 'Updated Title',
            'content' => $post->content,
        ]);

        $response->assertOk()
            ->assertJsonFragment(['title' => 'Updated Title']);
    }

    /** @test */
    public function a_user_cannot_update_others_posts()
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();

        $post = Post::factory()->for($otherUser)->create();

        $this->actingAs($user);

        $response = $this->putJson("/api/posts/{$post->id}", [
            'title' => 'Hacked Title',
            'content' => 'Hacked Content',
        ]);

        $response->assertStatus(403);
    }

    /** @test */
    public function a_user_can_delete_their_own_post()
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $post = Post::factory()->for($user)->create();

        $response = $this->deleteJson("/api/posts/{$post->id}");

        $response->assertStatus(200);
        $this->assertDatabaseMissing('posts', ['id' => $post->id]);
    }

    /** @test */
    public function a_user_cannot_delete_others_posts()
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();
        $post = Post::factory()->for($otherUser)->create();

        $this->actingAs($user);

        $response = $this->deleteJson("/api/posts/{$post->id}");

        $response->assertStatus(403);
        $this->assertDatabaseHas('posts', ['id' => $post->id]);
    }
}
