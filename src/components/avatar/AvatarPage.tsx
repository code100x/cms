'use client';

import React, { useState } from 'react';
import { Divider } from '@nextui-org/divider';
import { avatarCharacters } from '@/actions/avatar';
import Image from 'next/image';
import { CardBody, CardContainer, CardItem } from '../3dcard';
// import { avatarIdasd } from '@/app/avatar/page';

function AvatarPage() {
  const [avatarId, setAvatarId] = useState(1);
  const characterInfo = idToInfo(avatarId);

  return (
    <div className="mx-[50px] my-[50px] sm:mx-[100px] sm:my-[50px]">
      <div className="pb-8 text-[30px] font-extrabold dark:text-slate-600">
        which character are you?
      </div>
      <div className="flex flex-col items-center justify-center lg:flex-row">
        <Image
          src={characterInfo?.image}
          alt={characterInfo?.name}
          className="h-[200px] w-[200px] rounded-xl object-cover object-top md:h-[250px] md:w-[250px]"
          width={250}
          height={250}
        />

        <div className="flex max-w-[700px] flex-col items-center pt-[10px] md:mx-[100px] lg:items-start lg:pt-[0px]">
          <div className="pb-[20px] text-[32px] font-bold text-orange-500 dark:text-orange-300">
            {characterInfo?.name}
          </div>
          <div className="text-slate-700 dark:text-gray-200">
            {characterInfo?.desc}
          </div>
        </div>

        <div className="hidden w-full xl:block">
          <div className="pb-[10px] text-[28px] font-semibold dark:text-orange-300">
            Abilities
          </div>
          <div className="pb-[20px]">
            <div className="pb-[4px] font-semibold">
              Genjutsu - <span className="font-thin">Frontend skills</span>
            </div>
            <div className="flex max-w-[300px] rounded-full bg-white">
              <div
                style={{ width: `${characterInfo?.genjutsu}%` }}
                className={`h-[10px] rounded-full bg-green-500 transition-all duration-500 ease-out`}
              ></div>
            </div>
          </div>
          <div className="pb-[20px]">
            <div className="pb-[4px] font-semibold">
              Ninjutsu -{' '}
              <span className="font-thin">Server-side Logic skills</span>
            </div>
            <div className="flex max-w-[300px] rounded-full bg-white">
              <div
                style={{ width: `${characterInfo?.ninjutsu}%` }}
                className={`h-[10px] rounded-full bg-green-500 transition-all duration-500 ease-out`}
              ></div>
            </div>
          </div>
          <div className="">
            <div className="pb-[4px] font-semibold">
              Taijutsu -{' '}
              <span className="font-thin">Clean Code skills (without GPT)</span>
            </div>
            <div className="flex max-w-[300px] rounded-full bg-white">
              <div
                style={{ width: `${characterInfo?.taijutsu}%` }}
                className={`h-[10px] rounded-full bg-green-500 transition-all duration-500 ease-out`}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <Divider
        className="my-4 bg-gray-200 p-[1px] opacity-10"
        orientation="horizontal"
      />

      <div className="m-[50px] mx-[30px] grid max-w-full grid-cols-1 place-items-center gap-x-[150px] md:grid-cols-2 lg:grid-cols-3 xl:mx-[70px] xl:grid-cols-4">
        {avatarCharacters.map((avatar) => (
          <div
            onClick={() => {
              setAvatarId(avatar.id);
            }}
          >
            <CardContainer className="mb-[60px] h-[100px] w-[500px] cursor-pointer p-2">
              <CardItem translateZ="100" className="">
                <Image
                  src={avatar.image}
                  className="h-[200px] w-[300px] rounded-xl object-cover object-top"
                  alt={avatar.name}
                  // width={300}
                  // height={300}
                />
                <CardBody className="h-0 max-w-[250px]">
                  <span className="text-[18px] font-bold text-orange-600 dark:text-orange-300">
                    {avatar.name}
                  </span>{' '}
                  <br />
                  <span className="text-[14px] font-thin text-slate-900 dark:text-gray-200">
                    {avatar.catchphrase}
                  </span>
                </CardBody>
              </CardItem>
            </CardContainer>
          </div>
        ))}
      </div>
    </div>
  );
}

function idToInfo(id: number) {
  const character = avatarCharacters.find((avatar) => avatar.id === id);

  if (character) {
    return {
      id: character.id,
      name: character.name,
      catchphrase: character.catchphrase,
      image: character.image,
      desc: character.desc,
      genjutsu: character.genjutsu,
      ninjutsu: character.ninjutsu,
      taijutsu: character.taijutsu,
    };
  }
}

export default AvatarPage;
