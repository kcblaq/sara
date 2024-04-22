import React from 'react'
import Card from '../../Card'

export default function LinkBuildingOverview() {
  return (
    <main className='py-10 grid gap-8 '>
        <section className="grid gap-6 grid-cols-1 lg:grid-cols-3">
           <Card title={''} amount={undefined} style={''} percent={undefined} chart={undefined} /> 
           <Card title={''} amount={undefined} style={''} percent={undefined} chart={undefined} /> 
           <Card title={''} amount={undefined} style={''} percent={undefined} chart={undefined} /> 
        </section>
        <section className="grid gap-6 grid-cols-1 lg:grid-cols-3">
            
        </section>
    </main>
  )
}
