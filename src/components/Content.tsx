interface ContentProps {
  isSidebarOpen: boolean;
}

export function Content({ isSidebarOpen }: ContentProps) {
  return (
    <main
      className={`${
        isSidebarOpen && 'sm:ml-[300px]'
      } p-10 transition-all duration-300 children:mx-auto children:max-w-5xl`}
    >
      <h1 className='text-4xl font-bold'>Today</h1>
    </main>
  );
}
