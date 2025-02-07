'use client';
import React from "react";
import blockies from "ethereum-blockies";
import Image from "next/image";

interface AddressAvatarProps {
  address: string; 
}



const AddressAvatar: React.FC<AddressAvatarProps> = ({ address }) => {
  const avatarDataUrl = React.useMemo(() => {
    return blockies.create({
      seed: address.toLowerCase(), // Use the address as the seed
      size: 8, // Size of the blocks
      scale: 4, // Scale of the image
    }).toDataURL();
  }, [address]); 

  return <Image width={25} height={25} src={avatarDataUrl} alt="Avatar" className="rounded-full" />;
};

export default AddressAvatar;