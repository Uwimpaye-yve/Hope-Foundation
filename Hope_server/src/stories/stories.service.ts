import { Injectable } from '@nestjs/common';
import { CreateStoryDto } from './dto/create-story.dto';

@Injectable()
export class StoriesService {
  private mockStories = [
    {
      id: '1',
      title: 'From Struggle to Success',
      content: 'My journey with Hope Foundation started when I was at my lowest point. Through their programs, I found not just education but a community that believed in me.',
      author: 'Sarah M.',
      image: '/images/story1.jpg',
      status: 'published',
      createdAt: new Date('2024-01-10')
    },
    {
      id: '2', 
      title: 'Finding My Path',
      content: 'The counseling services helped me overcome anxiety and discover my passion for technology. Now I am pursuing a career in software development.',
      author: 'Michael R.',
      image: '/images/story2.jpg',
      status: 'published',
      createdAt: new Date('2024-01-05')
    },
    {
      id: '3',
      title: 'A Second Chance',
      content: 'Hope Foundation gave me a second chance when no one else would. Their support helped me get back on my feet and rebuild my life.',
      author: 'Jennifer L.',
      image: '/images/story3.jpg', 
      status: 'published',
      createdAt: new Date('2023-12-20')
    }
  ];

  async create(createStoryDto: CreateStoryDto) {
    const newStory = {
      id: (this.mockStories.length + 1).toString(),
      title: createStoryDto.title,
      content: createStoryDto.content,
      author: createStoryDto.author,
      image: createStoryDto.image || '/images/default-story.jpg',
      status: 'pending',
      createdAt: new Date()
    };
    this.mockStories.push(newStory);
    return newStory;
  }

  async findAll() {
    return this.mockStories.filter(story => story.status === 'published');
  }

  async findOne(id: string) {
    return this.mockStories.find(story => story.id === id);
  }
}