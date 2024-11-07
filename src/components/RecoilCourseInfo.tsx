'use client';

import { useSetRecoilState } from 'recoil';
import { courseIdAtom, fullCourseContentAtom } from '@/store/atoms';
import { useEffect } from 'react';
import { FullCourseContent } from '@/db/course';



export const RecoilCourseInfo = (
    {courseId, fullCourseContent}: 
    {fullCourseContent: FullCourseContent[]; courseId: string}) => {

    const setRecoilCourseId = useSetRecoilState(courseIdAtom);
    const SetRecoilFullCourseContent = useSetRecoilState(fullCourseContentAtom);

    useEffect(() => {
        setRecoilCourseId(courseId);
    }, [courseId, setRecoilCourseId])

    useEffect (() => {
        SetRecoilFullCourseContent(fullCourseContent);
    })

    return <></>
}