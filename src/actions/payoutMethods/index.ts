'use server';

import db from '@/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import {
  gitHubLinkSchema,
  payoutMethodDeleteSchema,
  solanaAddressInsertSchema,
  upiIdInsertSchema,
} from './schema';
import {
  DeleteTypePayoutMethod,
  InputTypeCreateSolana,
  InputTypeCreateUpi,
  InputTypeLinkGithub,
  ReturnTypeCreateSolana,
  ReturnTypeCreateUpi,
  ReturnTypeDeleteGithub,
  ReturnTypeLinkGithub,
  ReturnTypePayoutMethodDelete,
} from './types';
import { createSafeAction } from '@/lib/create-safe-action';

const addUpiHandler = async (
  data: InputTypeCreateUpi,
): Promise<ReturnTypeCreateUpi> => {
  console.log(data);
  const session = await getServerSession(authOptions);

  if (!session || !session.user.id) {
    throw new Error('Unauthorized');
  }

  const parsed = upiIdInsertSchema.safeParse(data);

  if (!parsed.success) {
    throw new Error('Invalid UPI ID');
  }
  try {
    const existingIds = await db.upiId.findMany({
      where: {
        userId: session.user.id,
      },
    });

    if (existingIds.length === 2) {
      return { error: 'You can only add 2 UPI ids' };
    }

    const isIdExist = await db.upiId.findUnique({
      where: {
        userId_value: {
          userId: session.user.id,
          value: parsed.data.upiId,
        },
      },
    });

    if (isIdExist) {
      return { error: 'UPI id already exists' };
    }

    const upiId = await db.upiId.create({
      data: {
        value: parsed.data.upiId,
        userId: session.user.id,
      },
    });

    return { data: upiId };
  } catch (error) {
    console.error(error);
    return { error: 'Failed to add UPI id' };
  }
};

const addSolanaHandler = async (
  data: InputTypeCreateSolana,
): Promise<ReturnTypeCreateSolana> => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user.id) {
    throw new Error('Unauthorized');
  }

  const parsed = solanaAddressInsertSchema.safeParse(data);

  if (!parsed.success) {
    throw new Error('Invalid Solana Address');
  }

  try {
    const existingAddresses = await db.solanaAddress.findMany({
      where: {
        userId: session.user.id,
      },
    });

    if (existingAddresses.length === 2) {
      return { error: 'You can only add 2 Solana addresses' };
    }

    const isIdExist = await db.solanaAddress.findUnique({
      where: {
        userId_value: {
          userId: session.user.id,
          value: parsed.data.solanaAddress,
        },
      },
    });

    if (isIdExist) {
      return { error: 'Solana address already exists' };
    }

    const solanaAddress = await db.solanaAddress.create({
      data: {
        value: parsed.data.solanaAddress,
        userId: session.user.id,
      },
    });

    return { data: solanaAddress };
  } catch (error) {
    console.error(error);
    return { error: 'Failed to add Solana Address' };
  }
};

export const getPayoutMethods = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user.id) {
    throw new Error('Unauthorized');
  }
  try {
    const upiIds = await db.upiId.findMany({
      where: {
        userId: session.user.id,
      },
    });
    const solanaAddresses = await db.solanaAddress.findMany({
      where: {
        userId: session.user.id,
      },
    });

    if (!upiIds || !solanaAddresses) {
      return { error: 'Failed to fetch payout methods' };
    }

    return { upiIds, solanaAddresses };
  } catch (error) {
    console.error(error);
    return { error: 'Failed to fetch payout methods' };
  }
};
const deleteUpiHandler = async (
  data: DeleteTypePayoutMethod,
): Promise<ReturnTypePayoutMethodDelete> => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user.id) {
    throw new Error('Unauthorized');
  }

  const parsed = payoutMethodDeleteSchema.safeParse(data);

  if (!parsed.success) {
    throw new Error('Invalid Id');
  }

  const result = await db.upiId.deleteMany({
    where: {
      id: data.id,
      userId: session.user.id,
    },
  });

  if (result.count === 0) {
    return { error: 'Failed to delete UPI id' };
  }

  return {
    data: {
      message: 'UPI address successfully deleted',
    },
  };
};

const deleteSolanaHandler = async (
  data: DeleteTypePayoutMethod,
): Promise<ReturnTypePayoutMethodDelete> => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user.id) {
    throw new Error('Unauthorized');
  }

  const parsed = payoutMethodDeleteSchema.safeParse(data);

  if (!parsed.success) {
    throw new Error('Invalid Address');
  }

  const result = await db.solanaAddress.deleteMany({
    where: {
      id: data.id,
      userId: session.user.id,
    },
  });

  if (result.count === 0) {
    return { error: 'Failed to delete Solana Address' };
  }

  return {
    data: {
      message: 'Solana address successfully deleted',
    },
  };
};

export const addGitHubHandler = async (
  data: InputTypeLinkGithub,
): Promise<ReturnTypeLinkGithub> => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user.id) {
    throw new Error('Unauthorized');
  }

  const parsed = gitHubLinkSchema.safeParse(data);

  if (!parsed.success) {
    throw new Error('Invalid Github Account');
  }
  try {
    const existingAccount = await db.gitHubAccount.findUnique({
      where: {
        userId: session.user.id,
      },
    });

    if (existingAccount) {
      return { error: 'Github Account is Already Linked.' };
    }

    const gitHubAccount = await db.gitHubAccount.create({
      data: {
        username: parsed.data.username,
        email: parsed.data.email,
        userId: session.user.id,
      },
    });

    return { data: gitHubAccount };
  } catch (error) {
    console.error(error);
    return { error: 'Failed to link Github Account' };
  }
};

export const deleteGitHubHandler =
  async (): Promise<ReturnTypeDeleteGithub> => {
    const session = await getServerSession(authOptions);

    if (!session || !session.user.id) {
      throw new Error('Unauthorized');
    }

    const result = await db.gitHubAccount.delete({
      where: {
        userId: session.user.id,
      },
    });

    if (!result) {
      return { error: 'Failed to delete Github.' };
    }

    return {
      data: {
        message: 'Github successfully deleted.',
      },
    };
  };

export const getGitHubAccount = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user.id) {
    throw new Error('Unauthorized');
  }

  try {
    const gitHubAccount = await db.gitHubAccount.findUnique({
      where: {
        userId: session.user.id,
      },
    });

    if (!gitHubAccount) {
      return { error: 'Failed to fetch Github Account' };
    }

    return { gitHubAccount };
  } catch (error) {
    console.error(error);
    return { error: 'Failed to fetch Github Account' };
  }
};

export const addUpi = createSafeAction(upiIdInsertSchema, addUpiHandler);

export const addSolanaAddress = createSafeAction(
  solanaAddressInsertSchema,
  addSolanaHandler,
);

export const deleteUpiId = createSafeAction(
  payoutMethodDeleteSchema,
  deleteUpiHandler,
);
export const deleteSolanaAddress = createSafeAction(
  payoutMethodDeleteSchema,
  deleteSolanaHandler,
);

export const linkGitHub = createSafeAction(gitHubLinkSchema, addGitHubHandler);
