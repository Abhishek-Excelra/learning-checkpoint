export default function Sidebar({ activeView, setActiveView }) {

  const navigationItems = [
    {
      id: 'javascript',
      label: 'JavaScript',
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      enabled: true,
    },
    {
      id: 'node',
      label: 'Node.js',
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
        </svg>
      ),
      enabled: false,
      comingSoon: true,
    },
    {
      id: 'django',
      label: 'Django',
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      enabled: false,
      comingSoon: true,
    },
  ];

  const utilityItems = [
    {
      id: 'notes',
      label: 'Notes',
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
    },
  ];

  return (
    <aside className="w-64 bg-white border-r border-neutral-200 h-full flex flex-col">
      <div className="p-4">
        <h2 className="text-sm font-semibold text-neutral-500 uppercase tracking-wide mb-3">
          Languages
        </h2>
        <nav className="space-y-1">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => item.enabled && setActiveView(item.id)}
              disabled={!item.enabled}
              className={`
                nav-item w-full text-left
                ${activeView === item.id ? 'active' : ''}
                ${!item.enabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              <span className="flex items-center justify-between w-full">
                <span className="flex items-center">
                  {item.icon}
                  <span className="ml-3">{item.label}</span>
                </span>
                {item.comingSoon && (
                  <span className="text-xs bg-neutral-100 text-neutral-600 px-2 py-1 rounded-full">
                    Soon
                  </span>
                )}
              </span>
            </button>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-neutral-100">
        <h2 className="text-sm font-semibold text-neutral-500 uppercase tracking-wide mb-3">
          Tools
        </h2>
        <nav className="space-y-1">
          {utilityItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`
                nav-item w-full text-left
                ${activeView === item.id ? 'active' : ''}
              `}
            >
              <span className="flex items-center justify-between w-full">
                <span className="flex items-center">
                  {item.icon}
                  <span className="ml-3">{item.label}</span>
                </span>
              </span>
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
}
