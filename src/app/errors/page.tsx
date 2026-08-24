import Link from 'next/link';

const errorCodes = [
  '400', '401', '403', '404', '408', '429', 
  '500', '501', '502', '503', '504', '505'
];

export default function ErrorsDirectory() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center py-20 text-slate-900 font-sans">
      
      <div className="w-full max-w-4xl px-6 space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900">
            Error Pages
          </h1>
          <p className="text-slate-500">Preview all error pages available on this website.</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {errorCodes.map((code) => (
            <Link 
              key={code}
              href={`/errors/${code}`}
              className="bg-white border border-slate-200 p-6 rounded-2xl flex flex-col items-center justify-center gap-2 hover:bg-blue-50 hover:border-blue-300 hover:shadow-md transition-all duration-300 group"
            >
              <span className="text-3xl font-black text-slate-400 group-hover:text-blue-600 transition-colors">
                {code}
              </span>
              <span className="text-xs tracking-wider uppercase text-slate-400 group-hover:text-blue-500 transition-colors font-medium">
                Preview
              </span>
            </Link>
          ))}
        </div>
        
        <div className="text-center pt-10">
          <Link 
            href="/"
            className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-bold tracking-wide rounded-xl hover:bg-blue-700 hover:shadow-lg transition-all duration-300"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
