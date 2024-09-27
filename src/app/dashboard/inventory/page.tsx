"use client";

import InventoryChart from '@/components/InventoryChart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2'; // Importing SweetAlert

const InventoryUpdateForm = () => {
  const [produces, setProduces] = useState([]);
  const [selectedProduce, setSelectedProduce] = useState('');
  const [quantity, setQuantity] = useState('');
  const [refetchTrigger, setRefetchTrigger] = useState(false); // New state for refetching

  // Fetch produces data for the dropdown
  useEffect(() => {
    const fetchProduces = async () => {
      try {
        const response = await fetch('https://agriguru.pythonanywhere.com/api/produces/');
        const data = await response.json();
        setProduces(data);
      } catch (error) {
        console.error('Error fetching produces:', error);
      }
    };

    fetchProduces();
  }, []);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedProduce || !quantity) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill out all fields.',
      });
      return;
    }

    const payload = {
      produce: selectedProduce,
      quantity: parseInt(quantity, 10),
    };

    try {
      const response = await fetch(`https://agriguru.pythonanywhere.com/api/inventory/${payload.produce}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        // Swal.fire({
        //   icon: 'success',
        //   title: 'Success!',
        //   text: 'Inventory updated successfully!',
        // });
        setSelectedProduce('');
        setQuantity('');
        setRefetchTrigger((prev) => !prev); // Toggle the refetch state
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Error updating inventory.',
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'An error occurred while updating inventory.',
      });
    }
  };

  return (
    <div className="flex gap-4">
      <InventoryChart refetchTrigger={refetchTrigger} /> {/* Pass refetchTrigger */}
      <Card>
        <CardHeader>
          <CardTitle>Inventory</CardTitle>
          <CardDescription>Inventory Update Form</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Produce selection */}
            <div>
              <label htmlFor="produce" className="block text-left font-medium mb-2">
                Select Produce:
              </label>
              <select
                id="produce"
                value={selectedProduce}
                onChange={(e) => setSelectedProduce(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="">-- Select Produce --</option>
                {produces.map((produce: any) => (
                  <option key={produce.id} value={produce.id}>
                    {produce.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Quantity input */}
            <div>
              <label htmlFor="quantity" className="block text-left font-medium mb-2">
                Quantity:
              </label>
              <input
                id="quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="Enter quantity"
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="bg-emerald-500 text-white font-bold py-2 px-4 rounded-md w-full"
            >
              Update Inventory
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default InventoryUpdateForm;
