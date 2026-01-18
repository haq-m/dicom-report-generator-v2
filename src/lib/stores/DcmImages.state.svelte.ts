import { browser } from '$app/environment';

export interface DicomTag {
    Group: string;
    Element: string;
    Description: string;
    Value: string;
}
export interface DicomData {
    fileName: string;
    imageUrl: string;
    dicomTag: DicomTag[];
}

const DCM_FILES_STORAGE_KEY = 'dcm-files';

export interface DcmImagesStateType {
    Images: Array<DicomData>;
}

export const DcmImages = createStagesState();

function createStagesState() {
    const state = $state<DcmImagesStateType>({
        Images: getDcmImages()
    });

    function getDcmImages(): Array<DicomData> {
        if (!browser) {
            return [];
        }
        const raw = localStorage.getItem(DCM_FILES_STORAGE_KEY);
        let dicomImages: Array<DicomData> = [];
        if (raw) {
            try {
                dicomImages = JSON.parse(raw);
            } catch (e) {
                console.error('Corrupt storage', e);
            }
        }
        return dicomImages;
    }

    function addDcmImage(dcmData: DicomData): 'Ok' | 'Failed' {
        if (!browser) {
            return 'Ok';
        }
        const index = state.Images.findIndex((p) => p.fileName === dcmData.fileName);
        if (index >= 0) {
            state.Images[index] = dcmData;
        } else {
            state.Images.unshift(dcmData);
        }

        try {
            localStorage.setItem(DCM_FILES_STORAGE_KEY, JSON.stringify(state.Images));
            return 'Ok';
        } catch (e) {
            console.error('Error saving DCM image to localStorage:', e);
        }
        return 'Failed';
    }

    return {
        // Getters
        get state() {
            return state;
        },

        // Setters
        addDcmImage
    };
}
