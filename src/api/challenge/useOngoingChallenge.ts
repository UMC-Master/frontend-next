'use client';
import { useQuery } from '@tanstack/react-query';
import { getOngoingChallenge } from './challenge.api';

export const useOngoingChallenge = () =>
  useQuery({
    queryKey: ['challenges', 'ongoing'],
    queryFn: getOngoingChallenge,
  });
