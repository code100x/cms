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

export const AddPayout = () => {
  type payoutType = 'upi' | 'solana';
  const [payoutType, setPayoutType] = useState<payoutType>();
  const [address, setAddress] = useState('');

  const handleValueChange = (value: payoutType) => {
    setPayoutType(value);
  };

  return (
    <diV className="mx-auto max-w-[500px] space-y-5">
      <Label htmlFor="address" className="text-xl">
        Enter details
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
          await axios.post('/api/addpayout', {
            payoutType,
            address,
          });
        }}
      >
        Add {payoutType === 'upi' ? 'UPI' : 'Solana'}
      </Button>
    </diV>
  );
};
