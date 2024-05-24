import { vi } from "vitest";
import '@testing-library/jest-dom'

vi.mock("next/font/local", () => ({
  default: () => ({
    className: 'mocked-font-class',
  }),
}));

vi.mock('next/font/google', () => ({
   Poppins: () => ({
     className: 'mocked-google-font-class',
   }),
 }));

 vi.mock('next-auth', () => ({
   getServerSession: vi.fn(),
 })); 
 