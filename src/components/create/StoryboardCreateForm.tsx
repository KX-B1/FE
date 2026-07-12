'use client';

import { useRef } from 'react';
import { MAX_IMAGE_COUNT, MAX_SCENARIO_LENGTH } from '@/types/create';
import { useStoryboardForm } from '@/hooks/useStoryboardForm';
import PageIntro from './PageIntro';
import ReferenceImageUploader, {
  type ReferenceImageUploaderHandle,
} from './ReferenceImageUploader';
import UploadedImageGrid from './UploadedImageGrid';
import ScenarioInput from './ScenarioInput';
import GenreSelector from './GenreSelector';
import GenerateButton from './GenerateButton';
import WritingGuide from './WritingGuide';

export default function StoryboardCreateForm() {
  const uploaderRef = useRef<ReferenceImageUploaderHandle>(null);

  const {
    images,
    scenario,
    genres,
    isSubmitting,
    isSubmitDisabled,
    setScenario,
    toggleGenre,
    addImages,
    removeImage,
    submit,
  } = useStoryboardForm();

  return (
    <div className="mx-auto max-w-315 px-2.5 py-10">
      <PageIntro />

      <div className="grid grid-cols-1 gap-2.5 lg:grid-cols-[400px_850px]">
        <div className="flex flex-col gap-8 p-2.5">
          <ReferenceImageUploader
            ref={uploaderRef}
            onFilesSelected={addImages}
            maxCount={MAX_IMAGE_COUNT}
          />
          <UploadedImageGrid
            images={images}
            maxCount={MAX_IMAGE_COUNT}
            onAddClick={() => uploaderRef.current?.openFileDialog()}
            onRemove={removeImage}
          />
        </div>

        <div className="flex flex-col gap-6">
          <ScenarioInput
            value={scenario}
            onChange={setScenario}
            maxLength={MAX_SCENARIO_LENGTH}
          />
          <GenreSelector selected={genres} onSelect={toggleGenre} />
          <WritingGuide />
        </div>
      </div>

      <div className="pt-6 flex justify-end">
        <GenerateButton
          onClick={submit}
          disabled={isSubmitDisabled}
          isLoading={isSubmitting}
        />
      </div>
    </div>
  );
}
