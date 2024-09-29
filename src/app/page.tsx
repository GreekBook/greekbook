'use client';

import Image from "next/image";
import {Search} from "lucide-react";
import {useState} from "react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {ModeToggle} from "@/components/theme-changer";

export default function Home() {
  const [eventType, setEventType] = useState('party')
  const [location, setLocation] = useState('All Chapters')
  const [price, setPrice] = useState('Any')

  const upcomingEvents = [
    { id: 1, title: "Alpha Beta Gamma Mixer", location: "Alpha Beta Gamma House", image: "/placeholder.svg?height=200&width=300" },
    { id: 2, title: "Delta Epsilon Spring Formal", location: "Grand Ballroom", image: "/placeholder.svg?height=200&width=300" },
    { id: 3, title: "Zeta Eta Beach Party", location: "Zeta Eta House", image: "/placeholder.svg?height=200&width=300" },
  ]

  return (
      <div className="flex flex-col min-h-screen bg-teal-100 dark:bg-zinc-900">
        <header className="flex justify-between items-center p-4 bg-white dark:bg-zinc-800">
          <h1 className="text-2xl font-bold text-teal-600">GreekBook</h1>
          <ModeToggle/>
        </header>

        <main className="flex-grow p-4 pb-20 overflow-y-auto">
          <div className="bg-white dark:bg-slate-700 rounded-xl p-4 shadow-lg mb-6">
            <h2 className="text-2xl font-semibold mb-4">I want to attend a</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
              <span
                  className={`px-3 py-1 rounded-full ${eventType === 'party' ? 'bg-teal-500 text-white' : 'bg-gray-200 dark:bg-stone-800'}`}
                  onClick={() => setEventType('party')}>Party</span>
                <span
                    className={`px-3 py-1 rounded-full ${eventType === 'formal' ? 'bg-teal-500 text-white' : 'bg-gray-200 dark:bg-stone-800    '}`}
                    onClick={() => setEventType('formal')}>Formal</span>
              </div>
              <Select
                  value={location}
                  onValueChange={(value) => setLocation(value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Chapters" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="x">Alpha Beta Gamma</SelectItem>
                  <SelectItem value="y">Delta Epsilon</SelectItem>
                  <SelectItem value="z">Zeta Eta</SelectItem>
                </SelectContent>
              </Select>
              <Select
                  value={price}
                  onValueChange={(value) => setPrice(value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="x">$0 - $10</SelectItem>
                  <SelectItem value="y">$11 - $20</SelectItem>
                  <SelectItem value="z">$21+</SelectItem>
                </SelectContent>
              </Select>
              <button
                  className="w-full bg-blue-500 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center">
                <Search className="w-5 h-5 mr-2"/>
                Search
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {upcomingEvents.map((event) => (
                <div key={event.id} className="bg-white dark:bg-slate-700 rounded-xl overflow-hidden shadow-lg">
                  <Image
                      src={event.image}
                      alt={event.title}
                      width={300}
                      height={200}
                      className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg">{event.title}</h3>
                    <p className="text-sm text-gray-600">{event.location}</p>
                  </div>
                  <div className="px-4 pb-4 flex justify-between items-center">
                    <span className="bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded-full">Featured</span>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm">View</button>
                  </div>
                </div>
            ))}
          </div>
        </main>
      </div>
  );
}
