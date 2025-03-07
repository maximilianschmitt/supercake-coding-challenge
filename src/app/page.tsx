'use client';
import React, { useDeferredValue, useEffect, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from '@radix-ui/react-dropdown-menu';
import { motion } from 'framer-motion';
import { Button } from './components/Button';
import ToggleButtons from './components/ToggleButton';
import {
  BirdIcon,
  CatIcon,
  ChevronDownIcon,
  DogIcon,
  RatIcon,
  SearchIcon,
  HamsterIcon,
} from './icons';

type SearchQuery = {
  searchText: string;
  species: string;
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
  const [searchQuery, setSearchQuery] = useState({
    searchText: '',
    species: '',
  });
  const [selectedAnimals, setSelectedAnimals] = useState<string[]>([]);
  const deferredSearchTerm = useDeferredValue(searchQuery); // minimize page redraw impact
  const [abortController, setAbortController] =
    useState<AbortController | null>(null); // increase performance by abort network request
  const [searchResult, setSearchResult] = useState([]);

  const prepareAbort = () => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (abortController) {
      abortController.abort();
      console.info('Previous request aborted');
    }

    setAbortController(controller);
    return signal;
  };

  useEffect(() => {
    if (!searchQuery.searchText) return;
    if (deferredSearchTerm) {
      fetchData(searchQuery, prepareAbort()).catch((error) => {
        if (error.name === 'AbortError') {
          console.info('Fetch was aborted:', searchQuery);
        }
      });
    }
  }, [deferredSearchTerm]);

  const fetchData = async (query: SearchQuery, signal: AbortSignal) => {
    try {
      console.info(`Fetching data for:`, query);
      const response = await fetch(
        `/api/customers?${new URLSearchParams(query).toString()}`,
        { signal },
      );

      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();
      console.info('API Response:', data);
      setSearchResult(data?.customers);
    } catch (error: unknown) {
      if (error instanceof Error && error.name !== 'AbortError') {
        console.error('Fetch error:', error);
      }
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery({ ...searchQuery, searchText: e.target.value });
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
    console.info('Applied Filters:', { searchQuery, selectedAnimals });
    searchQuery.species = selectedAnimals.join(',');
    fetchData(searchQuery, prepareAbort()).catch((error) => {
      if (error.name === 'AbortError') {
        console.info('Fetch aborted:', searchQuery);
      }
    });
  };

  const isDogSelected = selectedAnimals.includes(Animals.dog);
  const isCatSelected = selectedAnimals.includes(Animals.cat);
  const isBirdSelected = selectedAnimals.includes(Animals.bird);
  const isHamsterSelected = selectedAnimals.includes(Animals.hamster);
  const isRatsSelected = selectedAnimals.includes(Animals.rat);

  return (
    <div className="container mx-auto p-6 text-sm">
      <div className="mb-6 bg-background p-8 h-[150px] min-w-[570px]">
        <h2 className="text-2xl font-semibold">Customers and Pets</h2>
        <SearchIcon className="relative top-[28px] left-[12px]" />
        <input
          id="search"
          type="search"
          value={searchQuery.searchText}
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
          <DropdownMenuContent asChild
                               align="start"
                               sideOffset={5}>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="bg-white p-4 rounded-md shadow-lg max-w-[334px]"
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
                  icon={<DogIcon selected={isDogSelected} />}
                  pressed={isDogSelected}
                >
                  Dogs
                </ToggleButtons>
                <ToggleButtons
                  onPressedChange={() => handleAnimalSelection(Animals.cat)}
                  icon={<CatIcon selected={isCatSelected} />}
                  pressed={isCatSelected}
                >
                  Cats
                </ToggleButtons>
                <ToggleButtons
                  onPressedChange={() => handleAnimalSelection(Animals.bird)}
                  icon={<BirdIcon selected={isBirdSelected} />}
                  pressed={isBirdSelected}
                >
                  Birds
                </ToggleButtons>
                <ToggleButtons
                  onPressedChange={() => handleAnimalSelection(Animals.hamster)}
                  icon={<HamsterIcon selected={isHamsterSelected} />}
                  pressed={isHamsterSelected}
                >
                  Hamsters
                </ToggleButtons>
                <ToggleButtons
                  onPressedChange={() => handleAnimalSelection(Animals.rat)}
                  icon={<RatIcon selected={isRatsSelected} />}
                  pressed={isRatsSelected}
                >
                  Rats
                </ToggleButtons>
              </div>
              <DropdownMenuSeparator className="my-3 border relative right-4 w-[334px]" />
              <div className="flex gap-4">
                <Button className="grow-[4]" onClick={handleReset}>
                  Reset
                </Button>
                <Button
                  className="grow-[2]"
                  onClick={handleApplyFilters}
                  color="blue"
                >
                  Apply Filters
                </Button>
              </div>
            </motion.div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {searchResult.map((item: { id: string }) => (
        <pre key={item.id}>{JSON.stringify(item)}</pre>
      ))}
    </div>
  );
}
