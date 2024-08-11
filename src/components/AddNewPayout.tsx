'use client';

import { useState } from 'react';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Button } from './ui/button';
import axios from 'axios';
import { toast } from 'sonner';

export const AddPayout = () => {
  type payoutType = 'upi' | 'solana';
  const [payoutType, setPayoutType] = useState<payoutType>();
  const [address, setAddress] = useState('');

  const handleValueChange = (value: payoutType) => {
    setPayoutType(value);
  };

  return (
    <diV className="mx-auto my-10 space-y-5 rounded-md border-2 p-10 sm:max-w-[300px] md:max-w-[450px]">
      <Label htmlFor="address" className="text-xl">
        Enter details of wallet to add
      </Label>
      <div className="space-y-5">
        <div>
          <Select onValueChange={handleValueChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="upi">UPI</SelectItem>
              <SelectItem value="solana">Solana</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Input
          onChange={(e) => {
            setAddress(e.target.value);
          }}
          placeholder="Enter your address..."
          id="address"
        ></Input>
      </div>
      <Button
        onClick={async () => {
          try {
            await axios.post('/api/addpayout', {
              payoutType,
              address,
            });
            toast.success(
              `Added ${payoutType === 'upi' ? payoutType.toUpperCase() : payoutType} successfully!`,
            );
          } catch {
            toast.error('Error adding address!');
          }
        }}
      >
        Add {payoutType === 'upi' ? 'UPI' : 'Solana'}
      </Button>
    </diV>
  );
};
