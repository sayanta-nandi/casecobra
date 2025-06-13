import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { z } from "zod";
import sharp from "sharp";
import { createNewImage, updateImage } from "@/actions/action";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({
    image: {
      /**
       * For full list of options and defaults, see the File Route API reference
       * @see https://docs.uploadthing.com/file-routes#route-config
       */
      maxFileSize: "16MB",
      maxFileCount: 1,
    },
  })
    .input(
      z.object({
        configId: z.string().optional(),
      })
    )
    // Set permissions and file types for this FileRoute
    .middleware(async ({ input }) => {
      // This code runs on your server before upload
      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { input };
    })
    .onUploadComplete(async ({ metadata }) => {
      // This code RUNS ON YOUR SERVER after upload
      const { configId } = metadata.input;
      // const res = await fetch(file.url);
      // const buffer = await res.arrayBuffer();

      // const imgMetadata = await sharp(buffer).metadata();

      // const { width, height } = imgMetadata;

      // if (!configId) {
      //   const configuration = await createNewImage({
      //     croppedImageUrl: file.url,
      //     height: height || 500,
      //     width: width || 500,
      //     imageUrl: file.url,
      //   });
      //   return { configId: configuration.imageId };
      // } else {
      //   await updateImage({
      //     imageId: configId,
      //     croppedImageUrl: file.url,
      //   });
      // }

      // console.log("file url", file.url);

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { configId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
