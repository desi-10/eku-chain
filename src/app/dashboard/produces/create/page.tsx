// "use client"

// import { useForm, FormProvider } from "react-hook-form";
// import { Button } from "@/components/ui/button";
// import { FormControl, FormItem } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import Swal from "sweetalert2";

// interface Produce {
//   name: string;
//   description: string;
// }

// const ProduceCreateForm = () => {
//   const methods = useForm({
//     defaultValues: {
//       name: "",
//       description: "",
//     },
//   });

//   const { handleSubmit, reset } = methods;

//   const onSubmit = async (data: Produce) => {
//     try {
//       const response = await fetch('https://agriguru.pythonanywhere.com/api/produces/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//       });

//       if (response.ok) {
//         Swal.fire('Success!', 'Produce created successfully.', 'success');
//         reset(); // Reset the form fields
//       } else {
//         throw new Error('Failed to create produce');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       Swal.fire('Error', 'Failed to create produce', 'error');
//     }
//   };

//   return (
//     <FormProvider {...methods}>
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         {/* Name */}
//         <FormItem>
//           <Label htmlFor="name">Name</Label>
//           <FormControl>
//             <Input
//               id="name"
//               {...methods.register("name", { required: true, maxLength: 100, minLength: 1 })}
//               placeholder="Enter name"
//             />
//           </FormControl>
//         </FormItem>

//         {/* Description */}
//         <FormItem>
//           <Label htmlFor="description">Description</Label>
//           <FormControl>
//             <Input
//               id="description"
//               {...methods.register("description", { required: true, minLength: 1 })}
//               placeholder="Enter description"
//             />
//           </FormControl>
//         </FormItem>

//         <Button type="submit">Submit</Button>
//       </form>
//     </FormProvider>
//   );
// };

// export default ProduceCreateForm;








"use client"

import { useForm, FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FormControl, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Swal from "sweetalert2";
import { useState } from "react";

interface Produce {
  name: string;
  description: string;
  image: File | null; // Image can be either File or null
}

const ProduceCreateForm = () => {
  const methods = useForm<Produce>({
    defaultValues: {
      name: "",
      description: "",
      image: null, // Set initial value for image as null
    },
  });

  const { handleSubmit, reset, setValue } = methods;
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedImage(file);
    setValue('image', file); // Set image to either File or null
  };

  const onSubmit = async (data: Produce) => {
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('description', data.description);
      if (selectedImage) {
        formData.append('image', selectedImage); // Append the image file if selected
      }

      const response = await fetch('https://agriguru.pythonanywhere.com/api/produces/', {
        method: 'POST',
        body: formData, // Send FormData
      });

      if (response.ok) {
        Swal.fire('Success!', 'Produce created successfully.', 'success');
        reset(); // Reset the form fields
      } else {
        throw new Error('Failed to create produce');
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire('Error', 'Failed to create produce', 'error');
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" encType="multipart/form-data">
        {/* Name */}
        <FormItem>
          <Label htmlFor="name">Name</Label>
          <FormControl>
            <Input
              id="name"
              {...methods.register("name", { required: true, maxLength: 100, minLength: 1 })}
              placeholder="Enter name"
            />
          </FormControl>
        </FormItem>

        {/* Description */}
        <FormItem>
          <Label htmlFor="description">Description</Label>
          <FormControl>
            <Input
              id="description"
              {...methods.register("description", { required: true, minLength: 1 })}
              placeholder="Enter description"
            />
          </FormControl>
        </FormItem>

        {/* Image */}
        <FormItem>
          <Label htmlFor="image">Image</Label>
          <FormControl>
            <Input
              type="file"
              id="image"
              accept="image/*"
              onChange={onImageChange} // Handle image selection
            />
          </FormControl>
        </FormItem>

        <Button type="submit">Submit</Button>
      </form>
    </FormProvider>
  );
};

export default ProduceCreateForm;
