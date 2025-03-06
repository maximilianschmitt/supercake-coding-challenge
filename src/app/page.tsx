'use client';
import React, { useDeferredValue, useEffect, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from '@radix-ui/react-dropdown-menu';

import { Button } from './components/Button';
import { BirdIcon, CatIcon, ChevronDownIcon, DogIcon, RatIcon, SearchIcon, HamsterIcon } from './icons';
import ToggleButtons from '@/app/components/ToggleButton';


type SearchQuery = {
  search: string;
};

enum Animals {
  any = 'any',
  dog = 'dog',
  cat = 'cat',
  bird = 'bird',
  hamster = 'hamster',
  rat = 'rat',
}

export default function App() {
  const [searchQuery, setSearchQuery] = useState({ search: '', species: '' });
  const [selectedAnimals, setSelectedAnimals] = useState<string[]>([]);
  const deferredSearchTerm = useDeferredValue(searchQuery); // minimize page redraw impact
  const [abortController, setAbortController] =
    useState<AbortController | null>(null); // increase performance by abort network request

  const prepareAbort = () => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (abortController) {
      abortController.abort();
      console.log('Previous request aborted');
    }

    setAbortController(controller);
    return signal;
  }

  useEffect(() => {
    if (!searchQuery.search) return;
    if (deferredSearchTerm) {
      fetchData(searchQuery, prepareAbort()).catch((error) => {
        if (error.name === 'AbortError') {
          console.log('Fetch aborted:', searchQuery);
        }
      });
    }
  }, [deferredSearchTerm]);

  const fetchData = async (query: SearchQuery, signal: AbortSignal) => {
    try {
      console.log(`Fetching data for:`, query);
      const response = await fetch(
        `/api/customers?${new URLSearchParams(query).toString()}`,
        { signal },
      );

      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();
      console.log('API Response:', data);
    } catch (error: unknown) {
      if (error instanceof Error && error.name !== 'AbortError') {
        console.error('Fetch error:', error);
      }
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery({ ...searchQuery, search: e.target.value });
  };

  const handleAnimalSelection = (animal: keyof typeof Animals) => {
    setSelectedAnimals((prev: string[]) => {
      return prev.includes(animal)
        ? prev.filter((item) => item !== animal)
        : [...prev, animal];
    });
  };

  const handleReset = () => {
    setSearchQuery({ ...searchQuery, species: '' });
    setSelectedAnimals([]);
  };

  const handleApplyFilters = () => {
    console.log('Applied Filters:', { searchQuery, selectedAnimals });
    searchQuery.species = selectedAnimals.join(',');
    fetchData(searchQuery, prepareAbort()).catch((error) => {
      if (error.name === 'AbortError') {
        console.log('Fetch aborted:', searchQuery);
      }
    });
  };

  return (
    <div className="container mx-auto p-6 text-sm">
      <div className="mb-6 bg-background p-8 h-[150px]">
        <h2 className="text-2xl font-semibold">Customers and Pets</h2>
        <SearchIcon className="relative top-[28px] left-[12px]"  />
        <input
          id="search"
          type="text"
          value={searchQuery.search}
          onChange={handleSearchChange}
          className="border p-2 pl-10 mb-4 w-[312px] h-[40px] top-[132px] left-[90px] mr-4 rounded-lg"
          placeholder="Search by ID, name, email or phone"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="px-4 py-2 bg-white rounded-[12px] shadow-sm bold h-[40px] w-[122px] text-left">
              <span>Pets</span>
              <span className="w-[10px] inline-block ml-[50px]">
                <ChevronDownIcon />
              </span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="bg-white p-4 rounded-md shadow-lg max-w-[334px]"
            align="start"
            sideOffset={5}
          >
            <div className="flex flex-wrap gap-2 max-w-[300px] justify-center">
              <ToggleButtons
                onPressedChange={() => handleAnimalSelection(Animals.any)}
                pressed={selectedAnimals.includes(Animals.any)}
              >
                Any Animal
              </ToggleButtons>
              <ToggleButtons
                onPressedChange={() => handleAnimalSelection(Animals.dog)}
                icon={<DogIcon />}
                pressed={selectedAnimals.includes(Animals.dog)}
              >
                Dogs
              </ToggleButtons>
              <ToggleButtons
                onPressedChange={() => handleAnimalSelection(Animals.cat)}
                icon={<CatIcon />}
                pressed={selectedAnimals.includes(Animals.cat)}
              >
                Cats
              </ToggleButtons>
              <ToggleButtons
                onPressedChange={() => handleAnimalSelection(Animals.bird)}
                icon={<BirdIcon />}
                pressed={selectedAnimals.includes(Animals.bird)}
              >
                Birds
              </ToggleButtons>
              <ToggleButtons
                onPressedChange={() => handleAnimalSelection(Animals.hamster)}
                icon={<HamsterIcon />}
                pressed={selectedAnimals.includes(Animals.hamster)}
              >
                Hamsters
              </ToggleButtons>
              <ToggleButtons
                onPressedChange={() => handleAnimalSelection(Animals.rat)}
                icon={<RatIcon />}
                pressed={selectedAnimals.includes(Animals.rat)}
              >
                Rats
              </ToggleButtons>
            </div>

            <DropdownMenuSeparator className="my-3 border" />

            <div className="flex gap-4">
              <Button className="grow-[4]" onClick={handleReset}>Reset</Button>
              <Button className="grow-[2]" onClick={handleApplyFilters} color="blue">
                Apply Filters
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
