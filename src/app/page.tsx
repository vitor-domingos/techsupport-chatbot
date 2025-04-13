
'use client';

import {useState} from 'react';
import {answerFAQ} from '@/ai/flows/answer-faq';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {ScrollArea} from '@/components/ui/scroll-area';

export default function Home() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await answerFAQ({question});
      setAnswer(result?.answer || 'No answer found.');
    } catch (error) {
      console.error('Error answering FAQ:', error);
      setAnswer('Error processing your question.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-secondary py-10">
      <Card className="w-full max-w-2xl shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Tech Support Buddy</CardTitle>
          <CardDescription className="text-center">
            Ask your tech questions here!
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4">
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <div>
              <Textarea
                id="question"
                placeholder="Type your question here..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                required
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
              />
            </div>
            <Button type="submit" disabled={isLoading} className="bg-accent text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500">
              {isLoading ? 'Loading...' : 'Ask'}
            </Button>
          </form>
          {answer && (
            <div className="mt-6 p-4 bg-white rounded-md shadow-sm">
              <h3 className="text-lg font-semibold">Answer:</h3>
              <p>{answer}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
