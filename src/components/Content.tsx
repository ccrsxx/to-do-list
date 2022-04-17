import {
  FiEdit3,
  FiFlag,
  BsArrowRightCircle,
  FiTrash2,
  TiArrowSortedDown
} from '../common';

interface ContentProps {
  isSidebarOpen: boolean;
}

interface ToolTipsProps {
  text: string;
}

function ToolTips({ text }: ToolTipsProps) {
  return (
    <div
      className='z-1 invisible absolute top-[-35px] left-[50%] translate-x-[-50%] whitespace-nowrap 
                 rounded bg-black px-2 py-1 text-center text-sm text-white opacity-0
                 transition-opacity duration-300 group-hover:visible group-hover:opacity-100'
    >
      {text}
      <TiArrowSortedDown
        className='absolute top-[20px] left-[50%] translate-x-[-50%]
                   text-lg text-black group-hover:inline-block'
      />
    </div>
  );
}

function List() {
  return (
    <div
      className='flex justify-between border-b border-gray-300 p-1 children:flex
                 children:gap-1'
    >
      <div>
        <input
          className='form-check-input float-left mt-[5px] mr-2 h-4 w-4 cursor-pointer
                     appearance-none rounded-sm border border-gray-300 bg-white 
                     bg-contain bg-center bg-no-repeat align-top transition duration-200 
                   checked:border-blue-500 checked:bg-blue-500 focus:outline-none'
          type='checkbox'
          value=''
        />
        <p className='form-check-label inline-block'>Default checkbox</p>
      </div>
      <div className='children:relative children:transition-colors children:duration-300'>
        <button className='group rounded p-1 hover:bg-gray-200' type='button'>
          <FiEdit3 className='group-hover:text-black' />
          <ToolTips text='Edit' />
        </button>
        <button className='group rounded p-1 hover:bg-gray-200' type='button'>
          <FiFlag className='group-hover:text-black' />
          <ToolTips text='Change priority' />
        </button>
        <button className='group rounded p-1 hover:bg-gray-200' type='button'>
          <BsArrowRightCircle className='group-hover:text-black' />
          <ToolTips text='Move project' />
        </button>
        <button className='group rounded p-1 hover:bg-gray-200' type='button'>
          <FiTrash2 className='group-hover:text-black' />
          <ToolTips text='Delete' />
        </button>
      </div>
    </div>
  );
}

export function Content({ isSidebarOpen }: ContentProps) {
  return (
    <main
      className={`${
        isSidebarOpen && 'sm:ml-[300px]'
      } p-10 transition-all duration-300 children:mx-auto children:max-w-5xl`}
    >
      <h1 className='text-4xl font-bold'>Today</h1>
      <div className='mt-4 flex flex-col gap-5 text-lg'>
        <List />
        <List />
        <List />
      </div>
    </main>
  );
}
