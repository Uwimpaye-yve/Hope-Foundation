"use client";
import { useState, useEffect } from 'react';
import { ArrowLeft, Eye, Check, X, Calendar, User } from 'lucide-react';
import Link from 'next/link';

interface Story {
  id: string;
  title: string;
  content: string;
  author: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  category: string;
}

export default function StoriesPage() {
  const [stories, setStories] = useState<Story[]>([
    {
      id: '1',
      title: 'My Journey with Hope Foundation',
      content: 'Thanks to the coding program, I learned to build websites and now I help my family with their small business online...',
      author: 'Michael Chen',
      submittedAt: '2024-01-15',
      status: 'pending',
      category: 'Education'
    },
    {
      id: '2',
      title: 'Finding My Voice Through Art',
      content: 'The creative arts program helped me express my feelings and connect with other kids who understand...',
      author: 'Sarah Johnson',
      submittedAt: '2024-01-14',
      status: 'approved',
      category: 'Mental Health'
    },
    {
      id: '3',
      title: 'Building Confidence in Math',
      content: 'I used to be scared of math, but the Math & Science Explorers program made it fun and exciting...',
      author: 'Alex Rodriguez',
      submittedAt: '2024-01-13',
      status: 'pending',
      category: 'Education'
    }
  ]);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  const handleApprove = (id: string) => {
    setStories(stories.map(story => 
      story.id === id ? { ...story, status: 'approved' as const } : story
    ));
  };

  const handleReject = (id: string) => {
    setStories(stories.map(story => 
      story.id === id ? { ...story, status: 'rejected' as const } : story
    ));
  };

  const filteredStories = stories.filter(story => 
    filter === 'all' || story.status === filter
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="px-6 lg:px-8 py-12">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/dashboard/admin" className="text-gray-600 hover:text-gray-800">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Story Submissions</h1>
          <p className="text-gray-600">Review and manage success stories</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6">
        {['all', 'pending', 'approved', 'rejected'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status as any)}
            className={`px-4 py-2 rounded-lg font-medium capitalize ${
              filter === status 
                ? 'bg-orange-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {status} ({stories.filter(s => status === 'all' || s.status === status).length})
          </button>
        ))}
      </div>

      {/* Stories Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredStories.map((story) => (
          <div key={story.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(story.status)}`}>
                {story.status}
              </span>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {story.category}
              </span>
            </div>
            
            <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
              {story.title}
            </h3>
            
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {story.content}
            </p>
            
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
              <User className="w-3 h-3" />
              <span>{story.author}</span>
              <Calendar className="w-3 h-3 ml-2" />
              <span>{new Date(story.submittedAt).toLocaleDateString()}</span>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedStory(story)}
                className="flex-1 flex items-center justify-center gap-1 px-3 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 text-sm"
              >
                <Eye className="w-4 h-4" />
                View
              </button>
              
              {story.status === 'pending' && (
                <>
                  <button
                    onClick={() => handleApprove(story.id)}
                    className="flex items-center justify-center px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 text-sm"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleReject(story.id)}
                    className="flex items-center justify-center px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredStories.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No stories found for the selected filter.</p>
        </div>
      )}

      {/* Story Detail Modal */}
      {selectedStory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedStory.status)}`}>
                    {selectedStory.status}
                  </span>
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {selectedStory.category}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedStory(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {selectedStory.title}
              </h2>
              
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  <span>{selectedStory.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(selectedStory.submittedAt).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="prose max-w-none mb-6">
                <p className="text-gray-700 leading-relaxed">
                  {selectedStory.content}
                </p>
              </div>
              
              {selectedStory.status === 'pending' && (
                <div className="flex gap-3 pt-4 border-t">
                  <button
                    onClick={() => {
                      handleApprove(selectedStory.id);
                      setSelectedStory(null);
                    }}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                  >
                    <Check className="w-4 h-4" />
                    Approve Story
                  </button>
                  <button
                    onClick={() => {
                      handleReject(selectedStory.id);
                      setSelectedStory(null);
                    }}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                    Reject Story
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}