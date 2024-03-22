"use client"
import { Fragment } from 'react'
import { Tab } from '@headlessui/react'

const tabs = [
  {title: "People choice",content: "Here are the people we all need to emulate"},
  {title: "Amadi choice",content: "We have much things to say aboout them"},
  {title: "Ndi Nkama",content: "Ndi Nkama are really good people"},
  {title: "Frivolous",content: "We need to all come together to decide this"},
]

export default function page() {
  return (
   
        <Tab.Group>
      <Tab.List className="flex gap-4 w-full" >
        {
          tabs.map((tab)=> {
            return (
              <Tab as={Fragment} >
          {({ selected }) => (
            /* Use the `selected` state to conditionally style the selected tab. */
            <button
              className={
                selected ? 'bg-blue-500 text-white' : 'bg-white text-black'
              }
            >
           {tab.title}
            </button>
          )}
        </Tab>
            )
          })
        }
       
        
        
      </Tab.List>
     
            <Tab.Panels>
              {
                tabs.map((tab)=> {
                  return(
                    <Tab.Panel>
                      {tab.content}
                    </Tab.Panel>
                  )
                })
              }
      </Tab.Panels>
       
    </Tab.Group>
   
  )
}
