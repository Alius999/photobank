import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type PhotoModel = runtime.Types.Result.DefaultSelection<Prisma.$PhotoPayload>;
export type AggregatePhoto = {
    _count: PhotoCountAggregateOutputType | null;
    _avg: PhotoAvgAggregateOutputType | null;
    _sum: PhotoSumAggregateOutputType | null;
    _min: PhotoMinAggregateOutputType | null;
    _max: PhotoMaxAggregateOutputType | null;
};
export type PhotoAvgAggregateOutputType = {
    id: number | null;
    authorId: number | null;
};
export type PhotoSumAggregateOutputType = {
    id: number | null;
    authorId: number | null;
};
export type PhotoMinAggregateOutputType = {
    id: number | null;
    description: string | null;
    authorId: number | null;
    createdAt: Date | null;
};
export type PhotoMaxAggregateOutputType = {
    id: number | null;
    description: string | null;
    authorId: number | null;
    createdAt: Date | null;
};
export type PhotoCountAggregateOutputType = {
    id: number;
    description: number;
    authorId: number;
    createdAt: number;
    _all: number;
};
export type PhotoAvgAggregateInputType = {
    id?: true;
    authorId?: true;
};
export type PhotoSumAggregateInputType = {
    id?: true;
    authorId?: true;
};
export type PhotoMinAggregateInputType = {
    id?: true;
    description?: true;
    authorId?: true;
    createdAt?: true;
};
export type PhotoMaxAggregateInputType = {
    id?: true;
    description?: true;
    authorId?: true;
    createdAt?: true;
};
export type PhotoCountAggregateInputType = {
    id?: true;
    description?: true;
    authorId?: true;
    createdAt?: true;
    _all?: true;
};
export type PhotoAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PhotoWhereInput;
    orderBy?: Prisma.PhotoOrderByWithRelationInput | Prisma.PhotoOrderByWithRelationInput[];
    cursor?: Prisma.PhotoWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | PhotoCountAggregateInputType;
    _avg?: PhotoAvgAggregateInputType;
    _sum?: PhotoSumAggregateInputType;
    _min?: PhotoMinAggregateInputType;
    _max?: PhotoMaxAggregateInputType;
};
export type GetPhotoAggregateType<T extends PhotoAggregateArgs> = {
    [P in keyof T & keyof AggregatePhoto]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePhoto[P]> : Prisma.GetScalarType<T[P], AggregatePhoto[P]>;
};
export type PhotoGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PhotoWhereInput;
    orderBy?: Prisma.PhotoOrderByWithAggregationInput | Prisma.PhotoOrderByWithAggregationInput[];
    by: Prisma.PhotoScalarFieldEnum[] | Prisma.PhotoScalarFieldEnum;
    having?: Prisma.PhotoScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PhotoCountAggregateInputType | true;
    _avg?: PhotoAvgAggregateInputType;
    _sum?: PhotoSumAggregateInputType;
    _min?: PhotoMinAggregateInputType;
    _max?: PhotoMaxAggregateInputType;
};
export type PhotoGroupByOutputType = {
    id: number;
    description: string | null;
    authorId: number;
    createdAt: Date;
    _count: PhotoCountAggregateOutputType | null;
    _avg: PhotoAvgAggregateOutputType | null;
    _sum: PhotoSumAggregateOutputType | null;
    _min: PhotoMinAggregateOutputType | null;
    _max: PhotoMaxAggregateOutputType | null;
};
type GetPhotoGroupByPayload<T extends PhotoGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PhotoGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PhotoGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PhotoGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PhotoGroupByOutputType[P]>;
}>>;
export type PhotoWhereInput = {
    AND?: Prisma.PhotoWhereInput | Prisma.PhotoWhereInput[];
    OR?: Prisma.PhotoWhereInput[];
    NOT?: Prisma.PhotoWhereInput | Prisma.PhotoWhereInput[];
    id?: Prisma.IntFilter<"Photo"> | number;
    description?: Prisma.StringNullableFilter<"Photo"> | string | null;
    authorId?: Prisma.IntFilter<"Photo"> | number;
    createdAt?: Prisma.DateTimeFilter<"Photo"> | Date | string;
    author?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type PhotoOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    authorId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    author?: Prisma.UserOrderByWithRelationInput;
};
export type PhotoWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.PhotoWhereInput | Prisma.PhotoWhereInput[];
    OR?: Prisma.PhotoWhereInput[];
    NOT?: Prisma.PhotoWhereInput | Prisma.PhotoWhereInput[];
    description?: Prisma.StringNullableFilter<"Photo"> | string | null;
    authorId?: Prisma.IntFilter<"Photo"> | number;
    createdAt?: Prisma.DateTimeFilter<"Photo"> | Date | string;
    author?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id">;
export type PhotoOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    authorId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.PhotoCountOrderByAggregateInput;
    _avg?: Prisma.PhotoAvgOrderByAggregateInput;
    _max?: Prisma.PhotoMaxOrderByAggregateInput;
    _min?: Prisma.PhotoMinOrderByAggregateInput;
    _sum?: Prisma.PhotoSumOrderByAggregateInput;
};
export type PhotoScalarWhereWithAggregatesInput = {
    AND?: Prisma.PhotoScalarWhereWithAggregatesInput | Prisma.PhotoScalarWhereWithAggregatesInput[];
    OR?: Prisma.PhotoScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PhotoScalarWhereWithAggregatesInput | Prisma.PhotoScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"Photo"> | number;
    description?: Prisma.StringNullableWithAggregatesFilter<"Photo"> | string | null;
    authorId?: Prisma.IntWithAggregatesFilter<"Photo"> | number;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Photo"> | Date | string;
};
export type PhotoCreateInput = {
    description?: string | null;
    createdAt?: Date | string;
    author: Prisma.UserCreateNestedOneWithoutPhotosInput;
};
export type PhotoUncheckedCreateInput = {
    id?: number;
    description?: string | null;
    authorId: number;
    createdAt?: Date | string;
};
export type PhotoUpdateInput = {
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    author?: Prisma.UserUpdateOneRequiredWithoutPhotosNestedInput;
};
export type PhotoUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    authorId?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PhotoCreateManyInput = {
    id?: number;
    description?: string | null;
    authorId: number;
    createdAt?: Date | string;
};
export type PhotoUpdateManyMutationInput = {
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PhotoUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    authorId?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PhotoListRelationFilter = {
    every?: Prisma.PhotoWhereInput;
    some?: Prisma.PhotoWhereInput;
    none?: Prisma.PhotoWhereInput;
};
export type PhotoOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type PhotoCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    authorId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type PhotoAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    authorId?: Prisma.SortOrder;
};
export type PhotoMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    authorId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type PhotoMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    authorId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type PhotoSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    authorId?: Prisma.SortOrder;
};
export type PhotoCreateNestedManyWithoutAuthorInput = {
    create?: Prisma.XOR<Prisma.PhotoCreateWithoutAuthorInput, Prisma.PhotoUncheckedCreateWithoutAuthorInput> | Prisma.PhotoCreateWithoutAuthorInput[] | Prisma.PhotoUncheckedCreateWithoutAuthorInput[];
    connectOrCreate?: Prisma.PhotoCreateOrConnectWithoutAuthorInput | Prisma.PhotoCreateOrConnectWithoutAuthorInput[];
    createMany?: Prisma.PhotoCreateManyAuthorInputEnvelope;
    connect?: Prisma.PhotoWhereUniqueInput | Prisma.PhotoWhereUniqueInput[];
};
export type PhotoUncheckedCreateNestedManyWithoutAuthorInput = {
    create?: Prisma.XOR<Prisma.PhotoCreateWithoutAuthorInput, Prisma.PhotoUncheckedCreateWithoutAuthorInput> | Prisma.PhotoCreateWithoutAuthorInput[] | Prisma.PhotoUncheckedCreateWithoutAuthorInput[];
    connectOrCreate?: Prisma.PhotoCreateOrConnectWithoutAuthorInput | Prisma.PhotoCreateOrConnectWithoutAuthorInput[];
    createMany?: Prisma.PhotoCreateManyAuthorInputEnvelope;
    connect?: Prisma.PhotoWhereUniqueInput | Prisma.PhotoWhereUniqueInput[];
};
export type PhotoUpdateManyWithoutAuthorNestedInput = {
    create?: Prisma.XOR<Prisma.PhotoCreateWithoutAuthorInput, Prisma.PhotoUncheckedCreateWithoutAuthorInput> | Prisma.PhotoCreateWithoutAuthorInput[] | Prisma.PhotoUncheckedCreateWithoutAuthorInput[];
    connectOrCreate?: Prisma.PhotoCreateOrConnectWithoutAuthorInput | Prisma.PhotoCreateOrConnectWithoutAuthorInput[];
    upsert?: Prisma.PhotoUpsertWithWhereUniqueWithoutAuthorInput | Prisma.PhotoUpsertWithWhereUniqueWithoutAuthorInput[];
    createMany?: Prisma.PhotoCreateManyAuthorInputEnvelope;
    set?: Prisma.PhotoWhereUniqueInput | Prisma.PhotoWhereUniqueInput[];
    disconnect?: Prisma.PhotoWhereUniqueInput | Prisma.PhotoWhereUniqueInput[];
    delete?: Prisma.PhotoWhereUniqueInput | Prisma.PhotoWhereUniqueInput[];
    connect?: Prisma.PhotoWhereUniqueInput | Prisma.PhotoWhereUniqueInput[];
    update?: Prisma.PhotoUpdateWithWhereUniqueWithoutAuthorInput | Prisma.PhotoUpdateWithWhereUniqueWithoutAuthorInput[];
    updateMany?: Prisma.PhotoUpdateManyWithWhereWithoutAuthorInput | Prisma.PhotoUpdateManyWithWhereWithoutAuthorInput[];
    deleteMany?: Prisma.PhotoScalarWhereInput | Prisma.PhotoScalarWhereInput[];
};
export type PhotoUncheckedUpdateManyWithoutAuthorNestedInput = {
    create?: Prisma.XOR<Prisma.PhotoCreateWithoutAuthorInput, Prisma.PhotoUncheckedCreateWithoutAuthorInput> | Prisma.PhotoCreateWithoutAuthorInput[] | Prisma.PhotoUncheckedCreateWithoutAuthorInput[];
    connectOrCreate?: Prisma.PhotoCreateOrConnectWithoutAuthorInput | Prisma.PhotoCreateOrConnectWithoutAuthorInput[];
    upsert?: Prisma.PhotoUpsertWithWhereUniqueWithoutAuthorInput | Prisma.PhotoUpsertWithWhereUniqueWithoutAuthorInput[];
    createMany?: Prisma.PhotoCreateManyAuthorInputEnvelope;
    set?: Prisma.PhotoWhereUniqueInput | Prisma.PhotoWhereUniqueInput[];
    disconnect?: Prisma.PhotoWhereUniqueInput | Prisma.PhotoWhereUniqueInput[];
    delete?: Prisma.PhotoWhereUniqueInput | Prisma.PhotoWhereUniqueInput[];
    connect?: Prisma.PhotoWhereUniqueInput | Prisma.PhotoWhereUniqueInput[];
    update?: Prisma.PhotoUpdateWithWhereUniqueWithoutAuthorInput | Prisma.PhotoUpdateWithWhereUniqueWithoutAuthorInput[];
    updateMany?: Prisma.PhotoUpdateManyWithWhereWithoutAuthorInput | Prisma.PhotoUpdateManyWithWhereWithoutAuthorInput[];
    deleteMany?: Prisma.PhotoScalarWhereInput | Prisma.PhotoScalarWhereInput[];
};
export type PhotoCreateWithoutAuthorInput = {
    description?: string | null;
    createdAt?: Date | string;
};
export type PhotoUncheckedCreateWithoutAuthorInput = {
    id?: number;
    description?: string | null;
    createdAt?: Date | string;
};
export type PhotoCreateOrConnectWithoutAuthorInput = {
    where: Prisma.PhotoWhereUniqueInput;
    create: Prisma.XOR<Prisma.PhotoCreateWithoutAuthorInput, Prisma.PhotoUncheckedCreateWithoutAuthorInput>;
};
export type PhotoCreateManyAuthorInputEnvelope = {
    data: Prisma.PhotoCreateManyAuthorInput | Prisma.PhotoCreateManyAuthorInput[];
    skipDuplicates?: boolean;
};
export type PhotoUpsertWithWhereUniqueWithoutAuthorInput = {
    where: Prisma.PhotoWhereUniqueInput;
    update: Prisma.XOR<Prisma.PhotoUpdateWithoutAuthorInput, Prisma.PhotoUncheckedUpdateWithoutAuthorInput>;
    create: Prisma.XOR<Prisma.PhotoCreateWithoutAuthorInput, Prisma.PhotoUncheckedCreateWithoutAuthorInput>;
};
export type PhotoUpdateWithWhereUniqueWithoutAuthorInput = {
    where: Prisma.PhotoWhereUniqueInput;
    data: Prisma.XOR<Prisma.PhotoUpdateWithoutAuthorInput, Prisma.PhotoUncheckedUpdateWithoutAuthorInput>;
};
export type PhotoUpdateManyWithWhereWithoutAuthorInput = {
    where: Prisma.PhotoScalarWhereInput;
    data: Prisma.XOR<Prisma.PhotoUpdateManyMutationInput, Prisma.PhotoUncheckedUpdateManyWithoutAuthorInput>;
};
export type PhotoScalarWhereInput = {
    AND?: Prisma.PhotoScalarWhereInput | Prisma.PhotoScalarWhereInput[];
    OR?: Prisma.PhotoScalarWhereInput[];
    NOT?: Prisma.PhotoScalarWhereInput | Prisma.PhotoScalarWhereInput[];
    id?: Prisma.IntFilter<"Photo"> | number;
    description?: Prisma.StringNullableFilter<"Photo"> | string | null;
    authorId?: Prisma.IntFilter<"Photo"> | number;
    createdAt?: Prisma.DateTimeFilter<"Photo"> | Date | string;
};
export type PhotoCreateManyAuthorInput = {
    id?: number;
    description?: string | null;
    createdAt?: Date | string;
};
export type PhotoUpdateWithoutAuthorInput = {
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PhotoUncheckedUpdateWithoutAuthorInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PhotoUncheckedUpdateManyWithoutAuthorInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PhotoSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    description?: boolean;
    authorId?: boolean;
    createdAt?: boolean;
    author?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["photo"]>;
export type PhotoSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    description?: boolean;
    authorId?: boolean;
    createdAt?: boolean;
    author?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["photo"]>;
export type PhotoSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    description?: boolean;
    authorId?: boolean;
    createdAt?: boolean;
    author?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["photo"]>;
export type PhotoSelectScalar = {
    id?: boolean;
    description?: boolean;
    authorId?: boolean;
    createdAt?: boolean;
};
export type PhotoOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "description" | "authorId" | "createdAt", ExtArgs["result"]["photo"]>;
export type PhotoInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    author?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type PhotoIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    author?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type PhotoIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    author?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $PhotoPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Photo";
    objects: {
        author: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        description: string | null;
        authorId: number;
        createdAt: Date;
    }, ExtArgs["result"]["photo"]>;
    composites: {};
};
export type PhotoGetPayload<S extends boolean | null | undefined | PhotoDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PhotoPayload, S>;
export type PhotoCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PhotoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PhotoCountAggregateInputType | true;
};
export interface PhotoDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Photo'];
        meta: {
            name: 'Photo';
        };
    };
    findUnique<T extends PhotoFindUniqueArgs>(args: Prisma.SelectSubset<T, PhotoFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PhotoClient<runtime.Types.Result.GetResult<Prisma.$PhotoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends PhotoFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PhotoFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PhotoClient<runtime.Types.Result.GetResult<Prisma.$PhotoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends PhotoFindFirstArgs>(args?: Prisma.SelectSubset<T, PhotoFindFirstArgs<ExtArgs>>): Prisma.Prisma__PhotoClient<runtime.Types.Result.GetResult<Prisma.$PhotoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends PhotoFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PhotoFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PhotoClient<runtime.Types.Result.GetResult<Prisma.$PhotoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends PhotoFindManyArgs>(args?: Prisma.SelectSubset<T, PhotoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PhotoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends PhotoCreateArgs>(args: Prisma.SelectSubset<T, PhotoCreateArgs<ExtArgs>>): Prisma.Prisma__PhotoClient<runtime.Types.Result.GetResult<Prisma.$PhotoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends PhotoCreateManyArgs>(args?: Prisma.SelectSubset<T, PhotoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends PhotoCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, PhotoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PhotoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends PhotoDeleteArgs>(args: Prisma.SelectSubset<T, PhotoDeleteArgs<ExtArgs>>): Prisma.Prisma__PhotoClient<runtime.Types.Result.GetResult<Prisma.$PhotoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends PhotoUpdateArgs>(args: Prisma.SelectSubset<T, PhotoUpdateArgs<ExtArgs>>): Prisma.Prisma__PhotoClient<runtime.Types.Result.GetResult<Prisma.$PhotoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends PhotoDeleteManyArgs>(args?: Prisma.SelectSubset<T, PhotoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends PhotoUpdateManyArgs>(args: Prisma.SelectSubset<T, PhotoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends PhotoUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, PhotoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PhotoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends PhotoUpsertArgs>(args: Prisma.SelectSubset<T, PhotoUpsertArgs<ExtArgs>>): Prisma.Prisma__PhotoClient<runtime.Types.Result.GetResult<Prisma.$PhotoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends PhotoCountArgs>(args?: Prisma.Subset<T, PhotoCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PhotoCountAggregateOutputType> : number>;
    aggregate<T extends PhotoAggregateArgs>(args: Prisma.Subset<T, PhotoAggregateArgs>): Prisma.PrismaPromise<GetPhotoAggregateType<T>>;
    groupBy<T extends PhotoGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PhotoGroupByArgs['orderBy'];
    } : {
        orderBy?: PhotoGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PhotoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPhotoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: PhotoFieldRefs;
}
export interface Prisma__PhotoClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    author<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface PhotoFieldRefs {
    readonly id: Prisma.FieldRef<"Photo", 'Int'>;
    readonly description: Prisma.FieldRef<"Photo", 'String'>;
    readonly authorId: Prisma.FieldRef<"Photo", 'Int'>;
    readonly createdAt: Prisma.FieldRef<"Photo", 'DateTime'>;
}
export type PhotoFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PhotoSelect<ExtArgs> | null;
    omit?: Prisma.PhotoOmit<ExtArgs> | null;
    include?: Prisma.PhotoInclude<ExtArgs> | null;
    where: Prisma.PhotoWhereUniqueInput;
};
export type PhotoFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PhotoSelect<ExtArgs> | null;
    omit?: Prisma.PhotoOmit<ExtArgs> | null;
    include?: Prisma.PhotoInclude<ExtArgs> | null;
    where: Prisma.PhotoWhereUniqueInput;
};
export type PhotoFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PhotoSelect<ExtArgs> | null;
    omit?: Prisma.PhotoOmit<ExtArgs> | null;
    include?: Prisma.PhotoInclude<ExtArgs> | null;
    where?: Prisma.PhotoWhereInput;
    orderBy?: Prisma.PhotoOrderByWithRelationInput | Prisma.PhotoOrderByWithRelationInput[];
    cursor?: Prisma.PhotoWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PhotoScalarFieldEnum | Prisma.PhotoScalarFieldEnum[];
};
export type PhotoFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PhotoSelect<ExtArgs> | null;
    omit?: Prisma.PhotoOmit<ExtArgs> | null;
    include?: Prisma.PhotoInclude<ExtArgs> | null;
    where?: Prisma.PhotoWhereInput;
    orderBy?: Prisma.PhotoOrderByWithRelationInput | Prisma.PhotoOrderByWithRelationInput[];
    cursor?: Prisma.PhotoWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PhotoScalarFieldEnum | Prisma.PhotoScalarFieldEnum[];
};
export type PhotoFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PhotoSelect<ExtArgs> | null;
    omit?: Prisma.PhotoOmit<ExtArgs> | null;
    include?: Prisma.PhotoInclude<ExtArgs> | null;
    where?: Prisma.PhotoWhereInput;
    orderBy?: Prisma.PhotoOrderByWithRelationInput | Prisma.PhotoOrderByWithRelationInput[];
    cursor?: Prisma.PhotoWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PhotoScalarFieldEnum | Prisma.PhotoScalarFieldEnum[];
};
export type PhotoCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PhotoSelect<ExtArgs> | null;
    omit?: Prisma.PhotoOmit<ExtArgs> | null;
    include?: Prisma.PhotoInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PhotoCreateInput, Prisma.PhotoUncheckedCreateInput>;
};
export type PhotoCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.PhotoCreateManyInput | Prisma.PhotoCreateManyInput[];
    skipDuplicates?: boolean;
};
export type PhotoCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PhotoSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PhotoOmit<ExtArgs> | null;
    data: Prisma.PhotoCreateManyInput | Prisma.PhotoCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.PhotoIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type PhotoUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PhotoSelect<ExtArgs> | null;
    omit?: Prisma.PhotoOmit<ExtArgs> | null;
    include?: Prisma.PhotoInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PhotoUpdateInput, Prisma.PhotoUncheckedUpdateInput>;
    where: Prisma.PhotoWhereUniqueInput;
};
export type PhotoUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.PhotoUpdateManyMutationInput, Prisma.PhotoUncheckedUpdateManyInput>;
    where?: Prisma.PhotoWhereInput;
    limit?: number;
};
export type PhotoUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PhotoSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PhotoOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PhotoUpdateManyMutationInput, Prisma.PhotoUncheckedUpdateManyInput>;
    where?: Prisma.PhotoWhereInput;
    limit?: number;
    include?: Prisma.PhotoIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type PhotoUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PhotoSelect<ExtArgs> | null;
    omit?: Prisma.PhotoOmit<ExtArgs> | null;
    include?: Prisma.PhotoInclude<ExtArgs> | null;
    where: Prisma.PhotoWhereUniqueInput;
    create: Prisma.XOR<Prisma.PhotoCreateInput, Prisma.PhotoUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.PhotoUpdateInput, Prisma.PhotoUncheckedUpdateInput>;
};
export type PhotoDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PhotoSelect<ExtArgs> | null;
    omit?: Prisma.PhotoOmit<ExtArgs> | null;
    include?: Prisma.PhotoInclude<ExtArgs> | null;
    where: Prisma.PhotoWhereUniqueInput;
};
export type PhotoDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PhotoWhereInput;
    limit?: number;
};
export type PhotoDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PhotoSelect<ExtArgs> | null;
    omit?: Prisma.PhotoOmit<ExtArgs> | null;
    include?: Prisma.PhotoInclude<ExtArgs> | null;
};
export {};
