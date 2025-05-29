<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{

    // List all posts
    public function index()
    {
        $posts = Post::with('user')->get(); // load users of posts as well
        return response()->json($posts);
    }

    // We don't need create() method for API

    // Store a new post
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        $post = new Post($validated);
        $post->user_id = Auth::id(); // associate with logged-in user
        $post->save();

        return response()->json([
            'message' => 'Post created successfully',
            'post' => $post
        ], 201);
    }

    // Show a specific post
    public function show(Post $post)
    {
        $post->load('user'); // load with the user
        return response()->json($post);
    }

    // We don't need edit() method for API

    // Update a post
    public function update(Request $request, Post $post)
    {
        if (Auth::id() !== $post->user_id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'content' => 'sometimes|required|string',
        ]);

        $post->update($validated);

        return response()->json([
            'message' => 'Post updated successfully',
            'post' => $post
        ], 200);
    }

    // Delete a post
    public function destroy(Post $post)
    {
        if (Auth::id() !== $post->user_id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        $post->delete();

        return response()->json(['message' => 'Post deleted successfully'], 200);
    }
}
