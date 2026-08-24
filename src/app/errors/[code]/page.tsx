import Link from 'next/link';

const errorMessages: Record<string, { title: string, desc: string, accent: string }> = {
  '400': { title: 'Bad Request', desc: 'The server could not understand your request due to invalid syntax.', accent: 'text-amber-500' },
  '401': { title: 'Unauthorized', desc: 'You need to be authenticated to access this resource.', accent: 'text-rose-500' },
  '403': { title: 'Forbidden', desc: 'You don\'t have permission to access this resource.', accent: 'text-rose-600' },
  '404': { title: 'Page Not Found', desc: 'The page or document you requested could not be found.', accent: 'text-blue-500' },
  '408': { title: 'Request Timeout', desc: 'The server timed out waiting for your request to complete.', accent: 'text-orange-500' },
  '429': { title: 'Too Many Requests', desc: 'You\'ve sent too many requests. Please wait a moment and try again.', accent: 'text-yellow-600' },
  '500': { title: 'Internal Server Error', desc: 'Something went wrong on our end. Please try again later.', accent: 'text-red-500' },
  '501': { title: 'Not Implemented', desc: 'The server does not support the functionality required to fulfill the request.', accent: 'text-fuchsia-500' },
  '502': { title: 'Bad Gateway', desc: 'The server received an invalid response from an upstream server.', accent: 'text-purple-500' },
  '503': { title: 'Service Unavailable', desc: 'The service is temporarily unavailable. Please try again later.', accent: 'text-blue-600' },
  '504': { title: 'Gateway Timeout', desc: 'The upstream server failed to respond in time.', accent: 'text-indigo-500' },
  '505': { title: 'HTTP Version Not Supported', desc: 'The server does not support the HTTP protocol version used in the request.', accent: 'text-slate-500' },
};

export default async function ErrorSimulationPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  
  const errorData = errorMessages[code] || { 
    title: 'Unknown Error', 
    desc: 'An unexpected error occurred.',
    accent: 'text-slate-500'
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center text-slate-900 font-sans">
      
      <div className="z-10 text-center space-y-6 max-w-2xl px-6">
        <h1 className={`text-8xl md:text-9xl font-black ${errorData.accent} drop-shadow-sm`}>
          {code}
        </h1>
        <div className="h-1 w-full bg-slate-200 rounded-full mx-auto max-w-xs"></div>
        <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-[0.1em] text-slate-800">
          {errorData.title}
        </h2>
        <p className="text-slate-500 text-lg leading-relaxed max-w-lg mx-auto">
          {errorData.desc}
        </p>
        
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/errors"
            className="px-8 py-4 bg-white border border-slate-200 text-slate-600 font-bold tracking-wide rounded-xl hover:bg-slate-50 hover:shadow-lg transition-all duration-300"
          >
            All Error Pages
          </Link>
          <Link 
            href="/"
            className="px-8 py-4 bg-blue-600 text-white font-bold tracking-wide rounded-xl hover:bg-blue-700 hover:shadow-lg transition-all duration-300"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
      
    </div>
  );
}
