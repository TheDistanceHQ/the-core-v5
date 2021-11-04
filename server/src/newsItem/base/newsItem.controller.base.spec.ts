import { Test } from "@nestjs/testing";
import { INestApplication, HttpStatus, ExecutionContext } from "@nestjs/common";
import request from "supertest";
import { MorganModule } from "nest-morgan";
import { ACGuard } from "nest-access-control";
import { DefaultAuthGuard } from "../../auth/defaultAuth.guard";
import { ACLModule } from "../../auth/acl.module";
import { NewsItemController } from "../newsItem.controller";
import { NewsItemService } from "../newsItem.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  content: "exampleContent",
  createdAt: new Date(),
  id: "exampleId",
  publishedAt: new Date(),
  summary: "exampleSummary",
  title: "exampleTitle",
  titleMediaUrl: "exampleTitleMediaUrl",
  updatedAt: new Date(),
};
const CREATE_RESULT = {
  content: "exampleContent",
  createdAt: new Date(),
  id: "exampleId",
  publishedAt: new Date(),
  summary: "exampleSummary",
  title: "exampleTitle",
  titleMediaUrl: "exampleTitleMediaUrl",
  updatedAt: new Date(),
};
const FIND_MANY_RESULT = [
  {
    content: "exampleContent",
    createdAt: new Date(),
    id: "exampleId",
    publishedAt: new Date(),
    summary: "exampleSummary",
    title: "exampleTitle",
    titleMediaUrl: "exampleTitleMediaUrl",
    updatedAt: new Date(),
  },
];
const FIND_ONE_RESULT = {
  content: "exampleContent",
  createdAt: new Date(),
  id: "exampleId",
  publishedAt: new Date(),
  summary: "exampleSummary",
  title: "exampleTitle",
  titleMediaUrl: "exampleTitleMediaUrl",
  updatedAt: new Date(),
};

const service = {
  create() {
    return CREATE_RESULT;
  },
  findMany: () => FIND_MANY_RESULT,
  findOne: ({ where }: { where: { id: string } }) => {
    switch (where.id) {
      case existingId:
        return FIND_ONE_RESULT;
      case nonExistingId:
        return null;
    }
  },
};

const basicAuthGuard = {
  canActivate: (context: ExecutionContext) => {
    const argumentHost = context.switchToHttp();
    const request = argumentHost.getRequest();
    request.user = {
      roles: ["user"],
    };
    return true;
  },
};

const acGuard = {
  canActivate: () => {
    return true;
  },
};

describe("NewsItem", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: NewsItemService,
          useValue: service,
        },
      ],
      controllers: [NewsItemController],
      imports: [MorganModule.forRoot(), ACLModule],
    })
      .overrideGuard(DefaultAuthGuard)
      .useValue(basicAuthGuard)
      .overrideGuard(ACGuard)
      .useValue(acGuard)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  test("POST /news-items", async () => {
    await request(app.getHttpServer())
      .post("/news-items")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        createdAt: CREATE_RESULT.createdAt.toISOString(),
        publishedAt: CREATE_RESULT.publishedAt.toISOString(),
        updatedAt: CREATE_RESULT.updatedAt.toISOString(),
      });
  });

  test("GET /news-items", async () => {
    await request(app.getHttpServer())
      .get("/news-items")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          createdAt: FIND_MANY_RESULT[0].createdAt.toISOString(),
          publishedAt: FIND_MANY_RESULT[0].publishedAt.toISOString(),
          updatedAt: FIND_MANY_RESULT[0].updatedAt.toISOString(),
        },
      ]);
  });

  test("GET /news-items/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/news-items"}/${nonExistingId}`)
      .expect(404)
      .expect({
        statusCode: 404,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /news-items/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/news-items"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        createdAt: FIND_ONE_RESULT.createdAt.toISOString(),
        publishedAt: FIND_ONE_RESULT.publishedAt.toISOString(),
        updatedAt: FIND_ONE_RESULT.updatedAt.toISOString(),
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
